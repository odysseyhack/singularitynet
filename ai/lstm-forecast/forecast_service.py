from matplotlib import pyplot as plt
import numpy as np
import pandas as pd

import cntk as C

try:
    from urllib.request import urlretrieve
except ImportError:
    from urllib import urlretrieve

import cntk.tests.test_utils


def prepare_data(csv_file, time_steps, val_size=0.1, test_size=0.1):
    """Prepare the dataset to match the LSTM model inputs -> outputs."""
    df = pd.read_csv(csv_file, index_col="time", parse_dates=['time'], dtype=np.float32)
    
    df["date"] = df.index.date
    
    normalize = df['fonio.total'].max()
    df['fonio.current'] /= normalize
    df['fonio.total'] /= normalize
    
    grouped = df.groupby(df.index.date).max()
    grouped.columns = ["fonio.current.max", "fonio.total.max", "date"]
    
    df_merged = pd.merge(df, grouped, right_index=True, on="date")
    df_merged = df_merged[["fonio.current",
                           "fonio.total",
                           "fonio.current.max",
                           "fonio.total.max"]]

    grouped = df_merged.groupby(df_merged.index.date)

    per_day = []
    for _, group in grouped:
        per_day.append(group)
    
    val_size = int(len(per_day) * val_size)
    test_size = int(len(per_day) * test_size)
    next_val = 0
    next_test = 0
    
    result_x = {"train": [], "val": [], "test": []}
    result_y = {"train": [], "val": [], "test": []}
    
    for i, day in enumerate(per_day):
        total = day["fonio.total"].values
        if len(total) < 8:
            continue
        if i >= next_val:
            current_set = "val"
            next_val = i + int(len(per_day) / val_size)
        elif i >= next_test:
            current_set = "test"
            next_test = i + int(len(per_day) / test_size)
        else:
            current_set = "train"
        max_total_for_day = np.array(day["fonio.total.max"].values[0])
        for j in range(2, len(total)):
            result_x[current_set].append(total[0:j])
            result_y[current_set].append([max_total_for_day])
            if j >= time_steps:
                break
    for ds in ["train", "val", "test"]:
        result_y[ds] = np.array(result_y[ds])
    return result_x, result_y, normalize


def next_batch(_x, _y, ds, batch_size):
    """Get the next batch"""
    def as_batch(data, start, count):
        return data[start:start + count]
    for i in range(0, len(_x[ds]), batch_size):
        yield as_batch(_x[ds], i, batch_size), as_batch(_y[ds], i, batch_size)


def create_model(x_input, h_dims):
    """LSTM model with h_dims inputs"""
    with C.layers.default_options(initial_state=0.1):
        m = C.layers.Recurrence(C.layers.LSTM(h_dims))(x_input)
        m = C.sequence.last(m)
        m = C.layers.Dropout(0.2)(m)
        m = C.layers.Dense(1)(m)
        return m


def forecast(model_file, csv_file, time_steps, num_points=10):
    """Prepare the data to be the inputs of the LSTM Model and get its outputs"""
    x, y, normalize = prepare_data(csv_file, time_steps=time_steps)

    z = cntk.load_model(model_file)
    x_input = z.inputs[-1]

    batch_size = time_steps * 10
    predictions = []
    for x_batch, _ in next_batch(x, y, "test", batch_size):
        outputs = z.eval({x_input: x_batch})
        predictions.extend(outputs[:, 0])
        if len(predictions) >= batch_size * num_points:
            break
    return y["test"] * normalize, np.array(predictions) * normalize


def plot_predictions():
    """Plot a Chart with Real and Predicted Lines"""
    time_steps = 14
    num_points = int(input("NumOfPoints: "))
    test_data, predictions = forecast("LSTM_Fonio.model",
                                      "fonio.csv",
                                      time_steps,
                                      num_points)

    f, a = plt.subplots(1, 1, figsize=(12, 8))
    a.plot(test_data.flatten(), label="Fonio Production real")
    a.plot(np.array(predictions), label="Fonio Production pred")
    a.legend()
    plt.show()


if __name__ == '__main__':
    plot_predictions()

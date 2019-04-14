import os
import cntk

import pandas as pd
import numpy as np

import logging
try:
    from urllib.request import urlretrieve
except ImportError:
    from urllib import urlretrieve


logging.basicConfig(level=10, format="%(asctime)s - [%(levelname)8s] - %(name)s - %(message)s")
log = logging.getLogger("time_series_forecast")

data_dir = os.path.join(".", "data")


class Forecast:

    def __init__(self, model_file, csv_file, input_dim):
        self.model_file = model_file
        self.csv_file = os.path.join(data_dir, csv_file)
        self.input_dim = input_dim

    @staticmethod
    def _next_batch(x, y, ds, batch_size):
        """get the next batch for training"""
        def as_batch(p_data, start, count):
            return p_data[start:start + count]
        for i in range(0, len(x[ds]), batch_size):
            yield as_batch(x[ds], i, batch_size), as_batch(y[ds], i, batch_size)

    @staticmethod
    def _create_model(x_local, h_dims):
        """Create the model for time series prediction"""
        with cntk.layers.default_options(initial_state=0.1):
            m = cntk.layers.Recurrence(cntk.layers.LSTM(h_dims))(x_local)
            m = cntk.sequence.last(m)
            m = cntk.layers.Dropout(0.2)(m)
            m = cntk.layers.Dense(1)(m)
            return m

    def _prepare_data(self):
        """Prepare the dataset to match the LSTM model inputs -> outputs."""
        df = pd.read_csv(self.csv_file, index_col="time", parse_dates=['time'], dtype=np.float32)
    
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
    
        result_x = {"data": []}
        result_y = {"data": []}
    
        for i, day in enumerate(per_day):
            total = day["fonio.total"].values
            if len(total) < 8:
                continue
            max_total_for_day = np.array(day["fonio.total.max"].values[0])
            for j in range(2, len(total)):
                result_x["data"].append(total[0:j])
                result_y["data"].append([max_total_for_day])
                if j >= self.input_dim:
                    break
        result_y["data"] = np.array(result_y["data"])
        return result_x, result_y, normalize

    def forecast(self, num_points=10):
        """Prepare the data to be the inputs of the LSTM Model and get its outputs"""
        x, y, normalize = self._prepare_data()

        if not self.model_file:
            self.model_file = "LSTM_Fonio.model"
            
        model_file = os.path.join(data_dir, "model", "{}".format(self.model_file))
        z = cntk.load_model(model_file)
        x_input = z.inputs[-1]
    
        batch_size = self.input_dim
        predictions = []
        i = 0
        for x_batch, _ in self._next_batch(x, y, "data", batch_size):
            outputs = z.eval({x_input: x_batch})
            predictions.extend(outputs[:, 0])
            i += 1
            if i >= num_points:
                break
        return y["data"] * normalize, np.array(predictions) * normalize

import random


class GasConsumptionGenerator:
    def __init__(self):
        self.average_per_head_consumption = 83
        self.household_count = random.randint(1, 8)

    def get_naive_value(self):
        return sum(map(lambda x: self.average_per_head_consumption * (2*random.random()), range(self.household_count)))
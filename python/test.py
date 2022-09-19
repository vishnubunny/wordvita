from datetime import datetime

str_d1 = '2022/9/19'


# convert string to date object
d1 = datetime.strptime(str_d1, "%Y/%m/%d")

# difference between dates in timedelta
delta = datetime.today() - d1
print(f'Difference is {delta.days} days')
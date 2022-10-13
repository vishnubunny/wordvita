# from datetime import datetime
# clues=[["round","kids","stick","eat","lick"],["circle","food","triangle","toppings","bake"],["hair","tone","touch","sweat","organ"]]
# answers=[["lollipop","lollipops"],["pizza","pizzas"],["skin"]]
# str_d1 = '2022/10/10'


# # convert string to date object
# d1 = datetime.strptime(str_d1, "%Y/%m/%d")

# # difference between dates in timedelta
# days = datetime.today() - d1
# print(f'Difference is {days.days} days')
# today_clues = clues[days.days]
# today_answers = answers[days.days]
# print(today_answers, today_clues)

# print(clues[-1])

from datetime import datetime

now = datetime.now()
local_now = now.astimezone()
local_tz = local_now.date()

d1 = datetime.strptime("2022/10/09", "%Y/%m/%d")
days = local_tz - d1.date()

print(days.days)
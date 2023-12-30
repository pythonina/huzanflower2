from . import jalali
from django.conf import settings
import ghasedakpack
from django.http.response import JsonResponse

sms = ghasedakpack.Ghasedak(settings.SMS_APIKEY)

def jalali_converter(time):
    jmonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
    
    time_to_tuple = jalali.Gregorian(time).persian_tuple()
    time_to_list = list(time_to_tuple)
    time_to_list[1] = jmonths[time_to_list[1] - 1]

    output = "{} {} {}".format(
        time_to_list[2],
        time_to_list[1],
        time_to_list[0]
    )

    return output

def send_sms(**kwargs):
    res = sms.verification({**kwargs})
    if res == False:
        return JsonResponse({}, status=500)

from django.core.validators import RegexValidator, MinLengthValidator, EmailValidator

PHONE_VALIDATOR = RegexValidator('^09\d{9}$', 'تلفن باید شبیه 09123456789 باشد !')
CODE_VALIDATOR = RegexValidator('^\d{4}$')
CONTENT_VALIDATOR = MinLengthValidator(10, 'متن کوتاه می‌باشد !')
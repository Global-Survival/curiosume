#!/bin/sh

# install html-md:
# 	sudo npm install -g html-md
#	sudo apt-get install coffeescript

rm netention_development_plan.*
wget 'https://docs.google.com/document/d/1wOrRWd1t_CzYR3QJxYKhMJYp-cwe08KWZZr-hj6jKF4/export?format=odt' -Onetention_development_plan.odt
wget 'https://docs.google.com/document/d/1wOrRWd1t_CzYR3QJxYKhMJYp-cwe08KWZZr-hj6jKF4/export?format=html' -Onetention_development_plan.html
md netention_development_plan.html

rm netention_system_guide.*
wget 'https://docs.google.com/document/d/1S6GJoytdG_iWeFtztc5TPaXMZe_e6ewCPtqzy2_V7q8/export?format=odt' -Onetention_system_guide.odt
wget 'https://docs.google.com/document/d/1S6GJoytdG_iWeFtztc5TPaXMZe_e6ewCPtqzy2_V7q8/export?format=html' -Onetention_system_guide.html
md netention_system_guide.html

rm netention_user_guide.*
wget 'https://docs.google.com/document/d/1WGK5j0P3b4_9Ct8VKIkGPm_UwJUxK18cDJSW7DrArGY/export?format=odt' -Onetention_user_guide.odt
wget 'https://docs.google.com/document/d/1WGK5j0P3b4_9Ct8VKIkGPm_UwJUxK18cDJSW7DrArGY/export?format=html' -Onetention_user_guide.html
md netention_user_guide.html

rm netention_migration.*
wget 'https://docs.google.com/document/d/1zCDcf3wppZErEWeHDiU6drhsMhefaEi8ZP_IC4fefcU/export?format=odt'  -Onetention_migration.odt
wget 'https://docs.google.com/document/d/1zCDcf3wppZErEWeHDiU6drhsMhefaEi8ZP_IC4fefcU/export?format=html'  -Onetention_migration.html
md netention_migration.html




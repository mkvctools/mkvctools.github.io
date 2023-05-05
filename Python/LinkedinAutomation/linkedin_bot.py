# Importieren der benötigten Module
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time


print('Lets Go!')
# Erstellen eines Webdriver-Objekts für Chrome
driver = webdriver.Chrome()

# Öffnen der LinkedIn-Website
driver.get("https://example.com")

print('On WebPage')
time.sleep(5)

# Finden des gewünschten <a href> Elements anhand des sichtbaren Textes
link_test = driver.find_element_by_link_text("More information...") # Änderung hier
print("still in the programm")
time.sleep(5)

# Klicken auf das <a href> Element
link_test.click() # Änderung hier

time.sleep(5)

# Der Rest Ihres Codes bleibt unverändert
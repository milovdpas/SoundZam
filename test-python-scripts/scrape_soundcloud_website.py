# Import the required modules
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.service import Service
import time
from bs4 import BeautifulSoup

# Main Function
if __name__ == "__main__":

    # Enable Performance Logging of Chrome.
    desired_capabilities = DesiredCapabilities.CHROME
    desired_capabilities["goog:loggingPrefs"] = {"performance": "ALL"}

    # Create the webdriver object and pass the arguments
    options = webdriver.ChromeOptions()

    # Chrome will start in Headless mode
    options.add_argument('headless')

    # Ignores any certificate errors if there is any
    options.add_argument("--ignore-certificate-errors")

    # Startup the chrome webdriver with executable path and
    # pass the chrome options and desired capabilities as
    # parameters.
    service = Service(executable_path='C:/Users/milov/Downloads/chromedriver_win32/chromedriver.exe',
                      chrome_options=options,
                      desired_capabilities=desired_capabilities)
    driver = webdriver.Chrome(service=service)

    # Send a request to the website and let it load
    driver.get("https://soundcloud.com/discover")

    # Sleeps for 10 seconds
    time.sleep(10)

    # Gets content of page
    content = driver.page_source

    print("Quitting Selenium WebDriver")
    driver.quit()

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(content, 'html.parser')

    # Extract the title and artist of the track
    playlists = soup.find_all("a", class_="playableTile__artworkLink")
    print(len(playlists))
    for playlist in playlists:
        print(playlist['href'])

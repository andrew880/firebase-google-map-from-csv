import pandas as pd
import numpy as np
import eel, os, csv

eel.init("data", allowed_extensions=['.js', '.html'])
#eel.start("/home.html", size=(2000, 1400), position=(0,0))

# Read CSV and Calls register() from main.js 
@eel.expose
def readCSV(filePath):

    # Emypt List to Store Each Row's Value. Should be a 2D List
    data = []

    # Read CSV File
    with open(filePath, newline = '', encoding = "utf-8") as csvfile:
        rows = csv.reader(csvfile)
        
        # Skip Header
        next(rows)
        # Append Every Row to data List. 
        for row in rows:
            data.append(row)
    
    # Calls register() from main.js to Convert [Store, Address, Lng, Lat] => {Store:Store, Lat:Lat, Lng:Lng}
    eel.register(data)

eel.start("/index.html", size=(2000, 1400), position=(0,0))
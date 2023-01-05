import os, sys, random, requests
import socket
import requests
import random
from pystyle import Colors, Colorate, Center
from asciimatics.effects import BannerText, Print, Scroll
from asciimatics.renderers import ColourImageFile, FigletText, ImageFile, StaticRenderer
from asciimatics.scene import Scene
from asciimatics.screen import Screen
from asciimatics.exceptions import ResizeScreenError, StopApplication
import getpass
import time
from time import sleep
Banner = open("main.txt", "r", encoding="utf8").read()
output_lines = Banner.split("\n")
for_loop = False
send_for_loop = False
Line_Count = 0

output_for_loop = ""
for line in output_lines:
    if line.startswith("for("):
        for_int = line.split("(")[1].split(")")[0]
        for_loop = True
        new_c = Line_Count + 1
        while(True):
            if output_lines[new_c] == "}":
                for_loop = False
            else:
                output_for_loop += output_lines[new_c] + "\r\n"

            if for_loop == False:
                send_for_loop = True
                break
            new_c += 1
        if send_for_loop == True:
            for i in range(1,int(for_int)):
                output_for_loop = output_for_loop.replace("{CLEAR}", "\033[2J\033[1;1H")
                output_for_loop = output_for_loop.replace("{RED}", "\x1b[31m")
                output_for_loop = output_for_loop.replace("{RESET}", "\x1b[39m")
                print(output_for_loop)
            output_for_loop = ""
    elif line == "}":
        pass
    elif "SLEEP(" in line:
        get_int = line.split("(")[1].replace(")", "")
        time.sleep(int(get_int))
    else:
        line = line.replace("{CLEAR}", "\033[2J\033[1;1H")
        line = line.replace("{RED}", "\x1b[31m")
        line = line.replace("{RESET}", "\x1b[39m")
        print(line)
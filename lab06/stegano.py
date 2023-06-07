# Autor Oskar Lewna 278779
import sys

message_file = "mess.txt"
watermark_file = "watermark.html"
detect_file = "detect.txt"


def embed_method1():
    message_file = "mess.txt"
    watermark_file = "watermark.html"

    with open(message_file, "r", encoding="utf-8") as message_file:
        message = message_file.read().strip()

    with open("cover.html", "r", encoding="utf-8") as cover_file:
        cover = cover_file.readlines()

    binary_message = ""
    for x in message:
        binary = bin(int(x, 16))[2:].zfill(4)
        binary_message += binary

    num_lines = len(cover)
    if len(binary_message) > num_lines:
        print("Error: Message is too long to embed.")
        return

    watermark = ""
    for i in range(len(binary_message)):
        line = cover[i].rstrip()
        bit = binary_message[i]

        if bit == "1":
            line += " "
        watermark += line + "\n"

    for i in range(num_lines - len(binary_message)):
        watermark += cover[i + len(binary_message)]

    with open(watermark_file, "w", encoding="utf-8") as watermark_file:
        watermark_file.writelines(watermark)


def extract_method1():
    watermark_file = "watermark.html"
    detect_file = "detect.txt"

    message_length = 8 * 4

    with open(watermark_file, "r", encoding="utf-8") as watermark_file:
        watermark = watermark_file.readlines()

    message = ""
    for line in watermark:
        if len(line) > 1 and line[-2] == " ":
            message += "1"
        else:
            message += "0"
        if len(message) == message_length:
            break

    hex_message = ""
    for i in range(0, len(message), 4):
        hex_message += hex(int(message[i: i + 4], 2))[2:]

    with open(detect_file, "w", encoding="utf-8") as detect_file:
        detect_file.write(hex_message)


def embed_method2():
    message_file = "mess.txt"
    watermark_file = "watermark.html"

    with open(message_file, "r", encoding="utf-8") as message_file:
        message = message_file.read().strip()

    with open("cover.html", "r", encoding="utf-8") as cover_file:
        cover = cover_file.readlines()

    binary_message = ""
    for x in message:
        binary = bin(int(x, 16))[2:].zfill(4)
        binary_message += binary

    cover = "".join(cover)
    cover = cover.replace("  ", "")
    num_spaces = cover.count(" ")

    if len(binary_message) > num_spaces:
        print("Error: Message is too long to embed.")
        return

    watermark = ""
    cover = cover.split(" ")
    for i in range(len(binary_message)):
        bit = binary_message[i]

        if bit == "1":
            cover[i] += " "
        watermark += cover[i] + " "
    watermark += " ".join(cover[len(binary_message):])

    with open(watermark_file, "w", encoding="utf-8") as watermark_file:
        watermark_file.writelines(watermark)


def extract_method2():
    watermark_file = "watermark.html"
    detect_file = "detect.txt"

    with open(watermark_file, "r", encoding="utf-8") as watermark_file:
        watermark = watermark_file.readlines()

    message_length = 8 * 4

    message = ""
    watermark = "".join(watermark)
    watermark = watermark.split(" ")

    for i in range(len(watermark)):
        if watermark[i] == "":
            message += "1"
        else:
            message += "0"

    message = message.replace("01", "1")
    message = message[:message_length]

    hex_message = ""
    for i in range(0, len(message), 4):
        hex_message += hex(int(message[i: i + 4], 2))[2:]

    with open(detect_file, "w") as detect_file:
        detect_file.write(hex_message)


def embed_method3():
    message_file = "mess.txt"
    watermark_file = "watermark.html"

    with open(message_file, "r", encoding="utf-8") as message_file:
        message = message_file.read().strip()

    with open("cover.html", "r", encoding="utf-8") as cover_file:
        cover = cover_file.readlines()

    binary_message = ""
    for x in message:
        binary = bin(int(x, 16))[2:].zfill(4)
        binary_message += binary

    num_classes = "".join(cover).count("class")

    if len(binary_message) > num_classes:
        print("Error: Message is too long to embed.")
        return

    cover = [x.replace("d-blok", "") for x in cover]

    watermark = ""
    i = 0
    for line in cover:
        watermark_line = line
        if "class" in line:
            if len(binary_message) > i and binary_message[i] == "1":
                watermark_line = line.replace('class="', 'class="d-blok ')
            else:
                watermark_line = line.replace('class="', 'class="d-block ')
            watermark += watermark_line
            i += 1
        else:
            watermark += watermark_line

    with open(watermark_file, "w", encoding="utf-8") as watermark_file:
        watermark_file.writelines(watermark)


def extract_method3():
    watermark_file = "watermark.html"
    detect_file = "detect.txt"

    with open(watermark_file, "r", encoding="utf-8") as watermark_file:
        watermark = watermark_file.readlines()

    message_length = 8 * 4

    message = ""
    for line in watermark:
        if "class" in line:
            if "d-blok" in line:
                message += "1"
            else:
                message += "0"
        if len(message) == message_length:
            break

    hex_message = ""
    for i in range(0, len(message), 4):
        hex_message += hex(int(message[i: i + 4], 2))[2:]

    with open(detect_file, "w", encoding="utf-8") as detect_file:
        detect_file.write(hex_message)


def embed_method4():
    message_file = "mess.txt"
    watermark_file = "watermark.html"

    with open(message_file, "r", encoding="utf-8") as message_file:
        message = message_file.read().strip()

    with open("cover.html", "r", encoding="utf-8") as cover_file:
        cover = cover_file.readlines()

    cover = [x.replace("<font></font>", "") for x in cover]

    num_fonts = "".join(cover).count("<font>")

    binary_message = ""
    for x in message:
        binary = bin(int(x, 16))[2:].zfill(4)
        binary_message += binary

    print(len(binary_message))
    print(num_fonts)
    if len(binary_message) > num_fonts:
        print("Error: Message is too long to embed.")
        return

    watermark = ""
    i = 0
    for line in cover:
        watermark_line = line
        if "<font>" in line:
            if len(binary_message) > i and binary_message[i] == "1":
                watermark_line = line.replace("<font>", "<font></font><font>")
            else:
                watermark_line = line.replace(
                    "</font>", "</font><font></font>")
            watermark += watermark_line
            i += 1
        else:
            watermark += watermark_line

    with open(watermark_file, "w", encoding="utf-8") as watermark_file:
        watermark_file.write(watermark)


def extract_method4():
    watermark_file = "watermark.html"
    detect_file = "detect.txt"

    with open(watermark_file, "r", encoding="utf-8") as watermark_file:
        watermark = watermark_file.readlines()

    message_length = 8 * 4

    message = ""
    for line in watermark:
        if "<font></font><font>" in line:
            message += "1"
        if "</font><font></font>" in line:
            message += "0"
        if len(message) == message_length:
            break

    hex_message = ""
    for i in range(0, len(message), 4):
        hex_message += hex(int(message[i: i + 4], 2))[2:]

    with open(detect_file, "w", encoding="utf-8") as detect_file:
        detect_file.write(hex_message)


if sys.argv[1] == "-e":
    if sys.argv[2] == "-1":
        embed_method1()
    elif sys.argv[2] == "-2":
        embed_method2()
    elif sys.argv[2] == "-3":
        embed_method3()
    elif sys.argv[2] == "-4":
        embed_method4()
elif sys.argv[1] == "-d":
    if sys.argv[2] == "-1":
        extract_method1()
    elif sys.argv[2] == "-2":
        extract_method2()
    elif sys.argv[2] == "-3":
        extract_method3()
    elif sys.argv[2] == "-4":
        extract_method4()

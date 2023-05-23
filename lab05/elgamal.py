# Autor Oskar Lewna
import sys
import random


def generate_keys():
    f = open("elgamal.txt", "r")
    lines = f.readlines()
    f.close()

    lines = [int(line.strip()) for line in lines]
    p, g = lines

    private = random.randint(10**20, p)
    while gcd(p, private) != 1:
        private = random.randint(10**20, p)
    public = pow(g, private, p)

    f = open("private.txt", "w")
    f.write(str(p) + "\n" + str(g) + "\n" + str(private))
    f.close()

    f = open("public.txt", "w")
    f.write(str(p) + "\n" + str(g) + "\n" + str(public))
    f.close()


def encryption():
    f = open("public.txt", "r")
    lines = f.readlines()
    f.close()

    p, g, public = [int(line.strip()) for line in lines]

    k = random.randint(10**20, p)
    while gcd(p, k) != 1:
        k = random.randint(10**20, p)

    f = open("plain.txt", "r")
    lines = f.readlines()
    f.close()

    line = lines[0].strip()
    text = ""
    for i in line:
        text += str(ord(i))
    m = int(text)

    if m >= p:
        print("Wiadomość jest za długa!")
        exit()

    crypto = []
    crypto.append(pow(g, k, p))
    crypto.append(m * pow(public, k, p))

    f = open("crypto.txt", "w")
    f.write(str(crypto[0]) + "\n" + str(crypto[1]))
    f.close()


def decryption():
    f = open("crypto.txt", "r")
    lines = f.readlines()
    f.close()

    gk, mbk = [int(line.strip()) for line in lines]

    f = open("private.txt", "r")
    lines = f.readlines()
    f.close()

    p, g, private = [int(line.strip()) for line in lines]

    key = pow(gk, private, p)
    decrypt = int(mbk // key)

    decrypt = str(decrypt)
    text = ""
    while decrypt != "":
        if decrypt[0] == "1":
            text += chr(int(decrypt[:3]))
            decrypt = decrypt[3:]
        else:
            text += chr(int(decrypt[:2]))
            decrypt = decrypt[2:]
    decrypt = text

    f = open("decrypt.txt", "w")
    f.write(str(decrypt))
    f.close()


def signature():
    f = open("private.txt", "r")
    lines = f.readlines()
    f.close()

    p, g, private = [int(line.strip()) for line in lines]

    f = open("message.txt", "r")
    message = f.readlines()[0].strip()
    f.close()

    text = ""
    for i in message:
        text += str(ord(i))
    message_int = int(text)

    if message_int >= p:
        print("Wiadomość jest za długa!")
        exit()

    k = random.randint(10**20, p)
    while gcd(p - 1, k) != 1:
        k = random.randint(10**20, p)

    r = pow(g, k, p)
    x = int((message_int - private * r) * get_inverse(k, p - 1))

    f = open("signature.txt", "w")
    f.write(str(r) + "\n" + str(x))
    f.close()


def verification():
    f = open("public.txt", "r")
    lines = f.readlines()
    f.close()

    f = open("message.txt", "r")
    message = f.readlines()[0].strip()
    f.close()

    p, g, public = [int(line.strip()) for line in lines]

    f = open("signature.txt", "r")
    lines = f.readlines()
    f.close()

    r, x = [int(line.strip()) for line in lines]

    text = ""
    for i in message:
        text += str(ord(i))
    message = int(text)

    veryfied = pow(g, message, p) == (pow(public, r, p) * pow(r, x, p) % p)

    print("T" if veryfied else "N")

    f = open("veryfied.txt", "w")
    f.write("T" if veryfied else "N")
    f.close()


def gcd(a, b):
    if a < b:
        return gcd(b, a)
    elif a % b == 0:
        return b
    else:
        return gcd(b, a % b)


def eea(a, n):
    if n == 0:
        return a, 1, 0
    else:
        d, x, y = eea(n, a % n)
        return d, y, x - (a // n) * y


def get_inverse(a, n):
    d, x, y = eea(a, n)
    if d == 1:
        return x % n
    else:
        print("no inverse")


if sys.argv[1] == "-k":
    generate_keys()
elif sys.argv[1] == "-e":
    encryption()
elif sys.argv[1] == "-d":
    decryption()
elif sys.argv[1] == "-s":
    signature()
elif sys.argv[1] == "-v":
    verification()

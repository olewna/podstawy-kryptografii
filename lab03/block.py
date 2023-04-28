# Autor Oskar Lewna
# 278779

from hashlib import md5, sha256
from PIL import Image


def xor(a, b):
    return bytes(x ^ y for x, y in zip(a, b))


def divide_into_blocks(data, block_size):
    blocks = []

    for i in range(0, len(data), block_size):
        blocks.append(data[i:i + block_size])

    return blocks


def ecb_encryption(plaintext, key):
    blocks = divide_into_blocks(plaintext, len(key))
    ciphertext = b''
    for block in blocks:
        ciphertext += xor(block, key)
    return ciphertext


def cbc_encryption(plaintext, key, iv):
    blocks = divide_into_blocks(plaintext, len(key))
    ciphertext = b''
    prev_block = iv

    key_hash = sha256(key).digest()

    for block in blocks:
        encrypted_block = xor(block, prev_block)
        encrypted_block = xor(encrypted_block, key_hash)
        ciphertext += encrypted_block
        prev_block = encrypted_block
    return ciphertext


def encrypt(input, key):
    with Image.open(input) as img:
        pixels = img.load()
        width, height = img.size
        data = b''

        for y in range(height):
            for x in range(width):
                values = pixels[x, y]
                data += bytes([values])

        key = md5(key.encode()).digest()
        iv = md5(key).digest()

        ecb_data = ecb_encryption(data, key)
        cbc_data = cbc_encryption(data, key, iv)

        ecb_img = Image.frombytes(img.mode, img.size, ecb_data)
        ecb_img.save('ecb_crypto.bmp')

        cbc_img = Image.frombytes(img.mode, img.size, cbc_data)
        cbc_img.save('cbc_crypto.bmp')


input = 'plain.bmp'
# input = 'plain1.bmp'
# input = 'plain2.bmp'
key = 'randomowyklucz'

encrypt(input, key)

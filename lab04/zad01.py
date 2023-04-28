import hashlib

hash_functions = [hashlib.md5, hashlib.sha1, hashlib.sha224, hashlib.sha256, hashlib.sha384, hashlib.sha512, hashlib.blake2b]
results = []

with open('personal.txt', 'rb') as f_in, open('hash.txt', 'w') as f_out:
    data = f_in.read()
    for func in hash_functions:
        h = func(data).hexdigest()
        results.append(h)

    results.sort(key=len)

    for func, h in zip(hash_functions, results):
        f_out.write(f"{func.__name__}: {h}\n")

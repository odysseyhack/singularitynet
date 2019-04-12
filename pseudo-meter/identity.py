import hashlib
import ecdsa

from eth_account.messages import defunct_hash_message


BIP32_HARDEN = 0x80000000


class KeyIdentityProvider:
    def __init__(self, w3, private_key):
        self.w3 = w3
        if private_key.startswith("0x"):
            self.private_key = bytes(bytearray.fromhex(private_key[2:]))
        else:
            self.private_key = bytes(bytearray.fromhex(private_key))

        public_key = ecdsa.SigningKey.from_string(string=self.private_key,
                                                  curve=ecdsa.SECP256k1,
                                                  hashfunc=hashlib.sha256).get_verifying_key()

        self.address = self.w3.toChecksumAddress(
            "0x" + self.w3.sha3(hexstr=public_key.to_string().hex())[12:].hex())

    def get_address(self):
        return self.address

    def sign_message(self, message):
        h = defunct_hash_message(text=message)
        return self.w3.eth.account.signHash(h, self.private_key).signature

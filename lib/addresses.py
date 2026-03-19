########################################################################
#
# A class to handle addresses
#
########################################################################

from pprint import pprint
import config
import json

class Addresses:

    #
    # Get address list
    #
    def get_address_list(self, lang):
        addressesFile= config.ADDRESSES_API_DIR + '/' + lang + '.json'
        addressesArr = []
        with open(addressesFile, "r") as f:
          addresses = json.load(f)
          for key , row in addresses.items():
            addressesArr.append(row)
        return json.dumps(addressesArr)

        

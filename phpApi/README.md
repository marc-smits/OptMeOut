# Php API

## Info

This folder contains

1) Create [ayment link for Mollie
2) the API to make Pdf documents and send them to pingen.com.
3) The API to search addresses
4) Send members to email list on Laposta

In this readme are explained how to install this on a server and how to develop and test
on a local computer.

This folder contains the files to execute the php file index.php by a php command in a docker container.

## Server Installation

### Files

Copy the folder 'api' to the of the opt-me-out server so that the api/index can be reached for example on
https://optmeout.com/api/payment.php
https://optmeout.com/api/pingen.php
https://optmeout.com/api/search.php?term=test
https://optmeout.com/api/laposta.php?email=test@test.nl

### Configuration

Copy the file `phpApi/api/.env.example` to `phpApi/api/.env` and modify it after the instructions


# Testing Payments
Once you open the  https://optmeout.com/api/payment.php with the .env variable `PINGEN_ENVIRONMENT=staging`.

You should see a test form with some prefilled values. After a successful submit you should see a response like
`{"message":"Payment link generated ","link":"https:\/\/www.mollie.com\/checkout\/credit-card\/embedded\/siJBTnpBQnqEuXDQeJjEJ"}`
 
You can test it by replacing '\/' by '/'

## More info

https://github.com/mollie/mollie-api-php
https://docs.mollie.com/docs/psd2-api

Apikeys
https://my.mollie.com/dashboard/YOUR_ORG_NRO/developers/api-keys
Define payment methods
https://my.mollie.com/dashboard/YOUR_ORG_NROsettings/payment-methods



# Testing Pingen

Once you open the  https://optmeout.com/api/pingen.php with the .env variable `PINGEN_ENVIRONMENT=staging`.
You should see a test form with some prefilled values. After a successful submit you should see a response like

```
{"message":"Pdf sent in the file Lotte_De_Jonge-14-08-2025-10-55-49.pdf","content":{"recipientOrganization":"Test Organization","recipientFirstName":"Roel","recipientLastName":"van Leeuwen","recipientAddress1":"Ari\u00ebnshof ","receiver_number":"23 A 2","recipientAddress2":"1234AB","recipientCity":"Almelo","senderFirstName":"Lotte","senderLastName":"De Jong\u00eb","birthdate":"12\/04\/1995","id":"2233","senderEmail":"lottedejong@test.nl","senderPhone":"0612345678","content":"30 woorden ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum bibendum cursus. Praesent et volutpat felis. Ut varius posuere nisl, nec auctor quam molestie ultrices. Maecenas ac ligula est Lorem.\n\n80 woorden Aliquam at nisi metus, id ullamcorper urna. Vivamus sit amet varius mi. Donec venenatis mollis tortor sit amet aliquet. Vestibulum sagittis congue tortor eget imperdiet. Praesent turpis enim, malesuada ut sodales et, hendrerit condimentum mauris. Morbi commodo justo turpis. Praesent at ipsum vel ligula fringilla volutpat. Praesent facilisis faucibus orci sed varius. Integer dapibus quam quis ligula fringilla a lobortis ipsum condimentum. Etiam nulla ante, porttitor eget aliquam sed, congue non ipsum. Aenean vitae magna velit, in ultricies tellus. Donec.\n\n80 woorden Aliquam at nisi metus, id ullamcorper urna. Vivamus sit amet varius mi. Donec venenatis mollis tortor sit amet aliquet. Vestibulum sagittis congue tortor eget imperdiet. Praesent turpis enim, malesuada ut sodales et, hendrerit condimentum mauris. Morbi commodo justo turpis. Praesent at ipsum vel ligula fringilla volutpat. Praesent facilisis faucibus orci sed varius. Integer dapibus quam quis ligula fringilla a lobortis ipsum condimentum. Etiam nulla ante, porttitor eget aliquam sed, congue non ipsum. Aenean vitae magna velit, in ultricies tellus. Donec.\n\n30 woorden ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum bibendum cursus. Praesent et volutpat felis. Ut varius posuere nisl, nec auctor quam molestie ultrices. Maecenas ac ligula est Lorem."}}
```

And in a case of an error a response with errors. (Try foreaxmple by filling the field `recipientFirstName` by a string lobger than 200 charachters)
Theser error messages are sent also the the e-mail configure in the `.env` file.

```
{"error":{"data":{"type":"letters","id":"4dd88869-9504-4706-afcd-37b62f17e875","attributes":{"status":"action_required","file_original_name":"Lotte_De_Jong?-14-08-2025-12-56-25.pdf","file_pages":1,"address":"Test\nOrganizationasdasdasdasdsadsadsadsadsadasdsad\nsadasd\nRoel van Leeuwen\nAri\u00ebnshof 23 A 2","address_position":"left","country":"NL","delivery_product":null,"print_mode":null,"print_spectrum":null,"price_currency":null,"price_value":null,"paper_types":["normal"],"fonts":[{"name":"Helvetica-Bold","is_embedded":false},{"name":"Helvetica","is_embedded":false}],"source":"api","tracking_number":null,"submitted_at":null,"created_at":"2025-08-14T12:56:26+0200","updated_at":"2025-08-14T12:56:27+0200"},"relationships":{"organisation":{"links":{"related":"https:\/\/api-staging.pingen.com\/organisations\/e0a16dab-caad-4e9d-bcb0-8416d037bde9"},"data":{"type":"organisations","id":"e0a16dab-caad-4e9d-bcb0-8416d037bde9"}},"events":{"links":{"related":{"href":"https:\/\/api-staging.pingen.com\/organisations\/e0a16dab-caad-4e9d-bcb0-8416d037bde9\/letters\/4dd88869-9504-4706-afcd-37b62f17e875\/events","meta":{"count":2}}}},"batch":{"data":null}},"links":{"self":"https:\/\/api-staging.pingen.com\/organisations\/e0a16dab-caad-4e9d-bcb0-8416d037bde9\/letters\/4dd88869-9504-4706-afcd-37b62f17e875"},"meta":{"abilities":{"self":{"cancel":"state","delete":"ok","submit":"state","send-simplex":"ok","edit":"state","get-pdf-raw":"ok","get-pdf-validation":"ok","restore-original":"state","change-paper-type":"state","change-window-position":"ok","create-coverpage":"state","add-attachment":"state","fix-overwrite-restricted-areas":"state","fix-coverpage":"ok","fix-country":"state","fix-regular-paper":"state","fix-address":"ok","fix-interactive-content":"state","fix-format":"state","apply-preset":"ok","create-preset":"state"}}}}},"FORM":{"recipientOrganization":"Test Organizationasdasdasdasdsadsadsadsadsadasdsadsadasd","recipientFirstName":"Roel","recipientLastName":"van Leeuwen","recipientAddress1":"Ari\u00ebnshof ","receiver_number":"23 A 2","recipientAddress2":"1234AB","recipientCity":"Almelo","senderFirstName":"Lotte","senderLastName":"De Jong\u00eb","birthdate":"12\/04\/1995","id":"2233","senderEmail":"lottedejong@test.nl","senderPhone":"0612345678","content":"30 woorden ipsum dolor sit amet\/><br> consectetur adipiscing elit. Morbi condimentum bibendum cursus. Praesent et volutpat felis. Ut varius posuere nisl\/><br> nec auctor quam molestie ultrices. Maecenas ac ligula est Lorem.\r\n\r\n80 woorden Aliquam at nisi metus\/><br> id ullamcorper urna. Vivamus sit amet varius mi. Donec venenatis mollis tortor sit amet aliquet. Vestibulum sagittis congue tortor eget imperdiet. Praesent turpis enim\/><br> malesuada ut sodales et\/><br> hendrerit condimentum mauris. Morbi commodo justo turpis. Praesent at ipsum vel ligula fringilla volutpat. Praesent facilisis faucibus orci sed varius. Integer dapibus quam quis ligula fringilla a lobortis ipsum condimentum. Etiam nulla ante\/><br> porttitor eget aliquam sed\/><br> congue non ipsum. Aenean vitae magna velit\/><br> in ultricies tellus. Donec.\r\n\r\n80 woorden Aliquam at nisi metus\/><br> id ullamcorper urna. Vivamus sit amet varius mi. Donec venenatis mollis tortor sit amet aliquet. Vestibulum sagittis congue tortor eget imperdiet. Praesent turpis enim\/><br> malesuada ut sodales et\/><br> hendrerit condimentum mauris. Morbi commodo justo turpis. Praesent at ipsum vel ligula fringilla volutpat. Praesent facilisis faucibus orci sed varius. Integer dapibus quam quis ligula fringilla a lobortis ipsum condimentum. Etiam nulla ante\/><br> porttitor eget aliquam sed\/><br> congue non ipsum. Aenean vitae magna velit\/><br> in ultricies tellus. Donec.\r\n\r\n30 woorden ipsum dolor sit amet\/><br> consectetur adipiscing elit. Morbi condimentum bibendum cursus. Praesent et volutpat felis. Ut varius posuere nisl\/><br> nec auctor quam molestie ultrices. Maecenas ac ligula est Lorem."}}
```

## More info

[https://api.pingen.com/documentation](https://api.pingen.com/documentation)
[https://help.pingen.com/en/fix-and-enhance-letters](https://help.pingen.com/en/fix-and-enhance-letters)
[https://app-staging.pingen.com/](https://app-staging.pingen.com/)

# Testing Search

[https://optmeout.com/api/search.php/api/search.php?term=huis&locale=en_GB](https://optmeout.com/api/search.php/api/search.php?term=huis&locale=en_GB)
You should see the search results
You can also test by the test form by opening
[https://optmeout.com/api/search.php/api/search.php](https://optmeout.com/api/search.php/api/search.php)


# Testing Laposta

[https://optmeout.com/api/laposta.php?email=MyUniqueEmail@mail.com](https://optmeout.com/api/laposta.php?email=MyUniqueEmail@mail.com)
You should see the laposta results
You can also test by the test form by opening
[https://optmeout.com/api/laposta.php](https://optmeout.com/api/laposta.php)


## More info
https://api.laposta.nl/doc/index.nl.php


Get members of mailing list

curl 'https://api.laposta.nl/v2/member?list_id=LAPOSTA_LIST_ID' \
  -u LAPOSTA_API_KEY: 




## Docker Installation

### Create images

#### Delete existing images

##### img_opt_me_out_payment_api

First you need to check if you already have image by the command below.

` docker images | grep 'img_opt_me_out_payment_api' `

If you see the results below you need to delete the existing image. Other you can skip the paragraph Create image

```
img_opt_me_out_payment_api   latest      015677c2100f   6 weeks ago    1.02GB
```

Delete the by the command image below by adding the id of the image. (in this case see above it is 015677c2100f)

`docker rmi -f IMAGE_ID`



##### img_opt_me_out_pingen_api

First you need to check if you already have image by the command below.

` docker images | grep 'img_opt_me_out_pingen_api' `

If you see the results below you need to delete the existing image. Other you can skip the paragraph Create image

```
img_opt_me_out_pingen_api   latest      015677c2100f   6 weeks ago    1.02GB
```

Delete the by the command image below by adding the id of the image. (in this case see above it is 015677c2100f)

`docker rmi -f IMAGE_ID`

##### img_opt_me_out_search_api

In the same way delete the image for the search api
` docker images | grep 'img_opt_me_out_search_api' `

If you see the results below you need to delete the existing image. Other you can skip the paragraph Create image

```
img_opt_me_out_search_api   latest      015677c2100f   6 weeks ago    1.02GB
```

`docker rmi -f IMAGE_ID`

  ##### img_opt_me_out_laposta_api

In the same way delete the image for the laposta api
` docker images | grep 'img_opt_me_out_laposta_api' `

If you see the results below you need to delete the existing image. Other you can skip the paragraph Create image

```
img_opt_me_out_laposta_api   latest      015677c2100f   6 weeks ago    1.02GB
```

`docker rmi -f IMAGE_ID`

#### Create images

Build image by runnic the command below in this folde.
` docker image build -t img_opt_me_out_payment_api   -f   .docker/php/DockerfilePayment  . `
` docker image build -t img_opt_me_out_pingen_api   -f .docker/php/DockerfilePingen . `
` docker image build -t img_opt_me_out_search_api   -f .docker/php/DockerfileSearch . `
` docker image build -t img_opt_me_out_laposta_api   -f .docker/php/DockerfileLaposta . `

## Run

In the folder scripts we have a `scripts`  the script `pingen.sh` and `search.sh` to run the command to build the templates.

First you need to make the scripts executable by the command
`chmod a+x scripts/*`

Now you excute the php scripts by the commands:

`./scripts/pingen.sh`
`./scripts/search.sh`
`./scripts/laposta.sh`

## Php composer

The Php code uses Php composer [https://getcomposer.org/](https://getcomposer.org/) for the depency management.
All of the current vendor files are included in the Git Repo.
You need to install the  Php composer in your local computer only if you need to do changes in the current
packages.

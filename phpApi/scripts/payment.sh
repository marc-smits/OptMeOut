

 OPT_ME_OUT_PATH=${PWD/}
 echo $OPT_ME_OUT_PATH

 docker rm opt_me_out_payment_api; docker run  --name opt_me_out_payment_api  --privileged=true  -v $OPT_ME_OUT_PATH:/var/www  img_opt_me_out_payment_api
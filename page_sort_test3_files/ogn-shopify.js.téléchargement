
    (function () {
        var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        if (window.ShopifyBuy) {
            if (window.ShopifyBuy.UI) {
                ShopifyBuyInit();
            } else {
                loadScript();
            }
        } else {
            loadScript();
        }

        function loadScript() {
            var script = document.createElement('script');
            script.async = true;
            script.src = scriptURL;
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
            script.onload = ShopifyBuyInit;
        }

        function ShopifyBuyInit() {
            var client = ShopifyBuy.buildClient({
                domain: 'shop-d20pfsrd-com.myshopify.com',
                storefrontAccessToken: 'dff1b19946127b8d905aceae90811099',
            });

            var shopifyeles = {};

            ShopifyBuy.UI.onReady(client).then(function (ui) {
                jQuery(".shopify-buybutton").each(function(idx,ele){
                    var prodid = ele.getAttribute('shopify-id');
                    if (shopifyeles[prodid] != 1)
                    {
                        shopifyeles[prodid] = 1;

                        ui.createComponent('product', {
                            id: prodid,
                            node: document.getElementById('shopify-buybutton-' + prodid),
                            moneyFormat: '%24%7B%7Bamount%7D%7D',
                            options: {
                                "product": {
                                    "variantId": "all",
                                    "width": "140px",
                                    "contents": {
                                        "imgWithCarousel": false,
                                        "variantTitle": false,
                                        "description": false,
                                        "buttonWithQuantity": false,
                                        "quantity": false
                                    },
                                    "styles": {
                                        "product": {
                                            "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0",
                                                "margin-bottom": "50px"
                                            }
                                        },
                                        "button": {
                                            "font-size": "13px",
                                            "padding-top": "14.5px",
                                            "padding-bottom": "14.5px",
                                            "padding-left": "22px",
                                            "padding-right": "22px",
                                        },
                                        "title": {
                                            "font-size": "14px",
                                        },
                                        "compareAt": {
                                            "font-size": "12px"
                                        }
                                    }
                                },
                                "cart": {
                                    "contents": {
                                        "button": true
                                    },
                                    "styles": {
                                        "button": {
                                            "font-size": "13px",
                                            "padding-top": "14.5px",
                                            "padding-bottom": "14.5px",
                                        },
                                        "footer": {
                                            "background-color": "#ffffff"
                                        }
                                    }
                                },
                                "modalProduct": {
                                    "contents": {
                                        "img": false,
                                        "imgWithCarousel": true,
                                        "variantTitle": false,
                                        "buttonWithQuantity": true,
                                        "button": false,
                                        "quantity": false
                                    },
                                    "styles": {
                                        "product": {
                                            "@media (min-width: 601px)": {
                                                "max-width": "100%",
                                                "margin-left": "0px",
                                                "margin-bottom": "10px"
                                            }
                                        },
                                        "button": {
                                            "font-size": "13px",
                                            "padding-top": "14.5px",
                                            "padding-bottom": "14.5px",
                                            "padding-left": "22px",
                                            "padding-right": "22px",
                                        },
                                    }
                                },
                                "productSet": {
                                    "styles": {
                                        "products": {
                                            "@media (min-width: 601px)": {
                                                "margin-left": "0px"
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    };
                })
            });
        }
    })();
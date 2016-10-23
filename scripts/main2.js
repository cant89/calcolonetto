var irpef = [
  {
    from : 0,
    to : 15000,
    tax : 23
  },{
    from : 15001,
    to : 28000,
    tax : 27
  },{
    from : 28001,
    to : 55000,
    tax : 38
  },{
    from : 55001,
    to : 75000,
    tax : 41
  },{
    from : 75001,
    to : 99999999999,
    tax : 43
  }
];

var inps_tax = 27.72;

var $net_year = $(".net_year");
var $net_15 = $(".net_15");
var $gross = $(".gross");
var $submit = $(".submit");

function submit(){
  var gross = parseInt( $gross.val() );
  var gross_wo_inps =  gross/100*(100-inps_tax);
  var tax = 0;

  irpef.forEach((el, i) =>{
    tax += gross_wo_inps > el.to ? (el.to-el.from)/100*el.tax : Math.max(0, gross_wo_inps-el.from)/100*el.tax;
  });

  var net_year = gross_wo_inps-tax;
  var net_15 = net_year/15;

  $net_year.text(round(net_year));
  $net_15.text(round(net_15));

}

function round(num){
  return Math.round(num*100)/100
}

$submit.click(submit);

<?php

/**
*
*  Ajoute un zero
*
*/
function abce_addZero($num){
  if($num <= 9){
    return $num = '0'.$num;
  }else{
    return $num;
  }
}

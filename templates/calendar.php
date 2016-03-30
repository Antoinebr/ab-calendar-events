<?php

$num_mois = date("n");
$num_an = date("Y");

$num_mois = intval($num_mois);
$num_an = intval($num_an);


for($index = 0; $index <= 24; $index++): // 2eeme vleur Int à modifier pour augmenter le nombre d emois



  // pour pas s'embeter a les calculer a l'affchage des fleches de navigation...
  if($num_mois < 1) { $num_mois = 12; $num_an = $num_an - 1; }
  elseif($num_mois > 12) {	$num_mois = 1; $num_an = $num_an + 1; }

  // nombre de jours dans le mois et numero du premier jour du mois
  $int_nbj = date("t", mktime(0,0,0,$num_mois,1,$num_an));
  $int_premj = date("w",mktime(0,0,0,$num_mois,1,$num_an));



  /*
  *
  *	tableau des jours, tableau des mois...
  *
  */
  $tab_jours = array("","L","M","M","J","V","S","D");
  $tab_mois = array("","Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre");

  $tab_mois = apply_filters('abce_months_calendar',$tab_mois);

  $tab_jours = apply_filters('abce_day_calendar',$tab_jours);



  $int_nbjAV = date("t", mktime(0,0,0,($num_mois-1<1)?12:$num_mois-1,1,$num_an)); // nb de jours du moi d'avant
  $int_nbjAP = date("t", mktime(0,0,0,($num_mois+1>12)?1:$num_mois+1,1,$num_an)); // b de jours du mois d'apres

  // on affiche les jours du mois et aussi les jours du mois avant/apres, on les indique par une * a l'affichage on modifie l'apparence des chiffres *
  $tab_cal = array(array(),array(),array(),array(),array(),array()); // tab_cal[Semaine][Jour de la semaine]
  $int_premj = ($int_premj == 0)?7:$int_premj;
  $t = 1; $p = "";
  for($i=0;$i<6;$i++) {
    for($j=0;$j<7;$j++) {
      if($j+1 == $int_premj && $t == 1) { $tab_cal[$i][$j] = $t; $t++; } // on stocke le premier jour du mois
      elseif($t > 1 && $t <= $int_nbj) { $tab_cal[$i][$j] = $p.$t; $t++; } // on incremente a chaque fois...
      elseif($t > $int_nbj) { $p="*"; $tab_cal[$i][$j] = $p."1"; $t = 2; } // on a mis tout les numeros de ce mois, on commence a mettre ceux du suivant
      elseif($t == 1) { $tab_cal[$i][$j] = "*".($int_nbjAV-($int_premj-($j+1))+1); } // on a pas encore mis les num du mois, on met ceux de celui d'avant
    }
  }
  ?>

  <table class="calendar tab-hide">
    <tr class="month"><td colspan="7" align="center"><a class="prev" href="">  <  </a>&nbsp;&nbsp;<?php echo $tab_mois[$num_mois]." ".$num_an;  ?>&nbsp;&nbsp;<a class="next" href="">   >   </a></td></tr>

    <?php



    /*
    *
    * Définition des class  du calendrier
    *
    */


    // Calendar Header with days

    $day_row_name_class = "days-name";
    $day_row_name_class = apply_filters('ace_day_row_class',$day_row_name_class);

    echo'<tr class="days-name">';
    for($i = 1; $i <= 7; $i++){
      echo '<td><span>'.$tab_jours[$i].'</span></td>';
    }
    echo' </tr>';



    for($i=0;$i<6;$i++) {
      echo "<tr class='days'>";
      for($j=0;$j<7;$j++) {
        // Antoine
        $num_jour = abce_addZero($tab_cal[$i][$j]);
        $num_moisA = abce_addZero($num_mois);
        $dateClass = $num_an.$num_moisA.$num_jour;

        if(strstr($dateClass, '*')){
          $dateClass = $num_an.$num_moisA.$num_jour.' disabled';
        }
        //Antoine
        //  echo $dateClass;

        echo "<td".(($num_mois == date("n") && $num_an == date("Y") && $tab_cal[$i][$j] == date("j"))?' class="'.$dateClass.' active"':null)." class='".$dateClass."' data-session=''>"
        .((strpos($tab_cal[$i][$j],"*")!==false)?''.str_replace("*","",$tab_cal[$i][$j]).' ':$tab_cal[$i][$j])."</td>";
      }
      echo "</tr>";
    }
    ?>
  </table>

  <?php $num_mois++; endfor;  ?>

  <!-- abce popin -->
  <div id="abce-popin" class="parentDisable">
    <div class="popin-container">
      <div class="popin">
        <template id="popin-template">

          <?php ob_start(); ?>
          <h2>{{post_title}}</h2>
          <p>date : {{session_date.0}}</p>
          <p>{{post_content}}</p>
          <a href='{{url}}' class="btn"> Voir l'envenement</a>
          <?php $popin_content = ob_get_contents();ob_end_clean();
          echo $popin_content = apply_filters('abce_popin_content',$popin_content);
          ?>

        </template>
      </div>
    </div>
  </div>
  <!-- abce popin -->

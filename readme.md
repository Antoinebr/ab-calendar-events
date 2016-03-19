# AB Calendar Events WordPress

**Work in progress ! Don't use in production !**

Ce plugin permet de gérer des evenements (via cpt) et de les afficher dans un calendrier.
Au clic sur les evenements une popin affiche les infos de l'event.



## Les hooks


**Changer des jours de la semaine**

```php
function ab_function($days){
  return $days = array("","L","L","M","J","V","S","D");
}
add_filter('abce_day_calendar', 'ab_function');
```

**Changer les mois de l'année**
```php
function ab_month_function($months){
  return $months = array("","Janv","Février","Mar","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre");
}
add_filter('abce_months_calendar', 'ab_month_function');
```

**Changer / ajouter classes sur les jours**
```php
function ab_row_class($class){
  return $class.' my-custom-class';
}
add_filter('abce_day_row_class', 'ab_row_class');
```

**Changer le contenu de la popin**
```php
function ab_popin_content(){
  return "
  <h2>My Nice {{post_title}}</h2>
  <p>The date {{session_date.0}}</p>
  <p>The awesome {{post_content}}</p>
  ";
}
add_filter('abce_popin_content', 'ab_popin_content');
```

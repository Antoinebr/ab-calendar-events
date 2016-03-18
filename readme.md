# AB Calendar Events WordPress

**Work in progress ! Don't use in production !**

Ce plugin permet de gérer des evenements (via cpt) et de les afficher dans un calendrier.
Au clic sur les evenements une popin affiche les infos de l'event.


## Customiser la popin

Le templating JavaScript est réalisé avec mustache.js

```html
<!-- ab-calendar-events/templates/calendar.php -->

<!-- abce popin -->
<div id="abce-popin" class="parentDisable">
  <div class="popin-container">
    <div class="popin">
      <template id="popin-template">

        <h2>{{post_title}}</h2>
        <p>date : {{session_date.0}}</p>
        <p>{{post_content}}</p>
        <a href="{{url}}" class="btn"> Voir l'envenement</a>
      </template>
    </div>
  </div>
</div>
<!-- abce popin -->

```

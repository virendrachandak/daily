```css
/* default state */
.state-indicator {
  position: absolute;
  top: -999em;
  left: -999em;

  z-index: 1;
}

/* small desktop */
@media all and (max-width: 1200px) {
  .state-indicator {
     z-index: 3;
  }
}

/* tablet */
@media all and (max-width: 1024px) {
  .state-indicator {
    z-index: 3;
  }
}

/* mobile phone */
@media all and (max-width: 768px) {
  .state-indicator {
     z-index: 4;
  }
}
```

[Device State Detection with CSS Media Queries and JavaScript](http://davidwalsh.name/device-state-detection-css-media-queries-javascript)

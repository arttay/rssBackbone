Note: Unless otherwise stated, all file are located in the UIRuntime project.
The css used in UIRuntime uses scss as it’s precompiler. All pre-compiled scss can be found in the scss folder, the scss for bootstrap (mixins, functions and general scss) can be found under `public/vendor/bootstrap-sass/vendor/stylesheets` and all compiled css can be found under `public/stylesheets`.
`Main.scss` is where all scss is compiled from, no scss is to be written in it. You must import a stylesheet into `main.scss`: 
```sass
@import "namespace/namespace";
```

You do not need to add a file extension to the end (you can if you want to though);
All responsive scss must go in `responsive.scss`
The scss contains theme files (slate, spring), components and namespaces.
Theme files are for the various skins that clients can choose from. Each theme directory contains 3 files: _bootswatch, _variables, bootstrap and sometimes _test-vars.scss

1. Bootswatch contains overrides css for that specific theme.
2. Variables contains all sass variables that will be used by bootstrap on compile. Variables include background color, hyperlink colors, navigation colors and text color.
3. Bootstrap is similar to main.scss, in that it’s an aggregate for all the files for that specific theme.



Most of the time you will not need to edit any of the css in any of the above files.

Components contains the scss for all the custom components created by Digital River (and some overrides)
The objects folder contains html/css design pattern (such as the media object)

Namespace contains all the custom css written by Digital River. Whenever you write any new css for any pages for UIRuntime, it must go into the correct namespace. That is, if you were to add a selector to the full cart page, it must go under `namespace/cart/full`

To add a new page or namespace

1.	 Add a div or another markup element with an id within the naming convention to the dust view file 
```html
<html><body><div id=”fullCart”></div></body></html>
```
2.	In `namespace.scss` add a selector for your id and inside that selector import the file that contains the sass file for your page/component.  Make sure that you have created a directory in the namespace folder for your page.
```sass
#fullCart {@import "fullCart/fullCart";}
```

To add a new theme to the display manager: 

1.	Open the GCPrimeSiteTool project and navigate to `views/page/site-config.dust`
2.	There will be a set of options with the names of the current themes.
3.	Add the following code to the end of the options list (make sure to replace themeName with the name of your theme)
```html
<option value="<%themeName%>"{@if cond="'{site.template.presentationCss}' == '<%themeName%>'"} selected{/if}><%themeName%></option>
```

Because bootstrap makes up a good portion of our css, we also have html partials. The various html/dust partials are located at `views/components`.
To include an html/dust partial in your own dust file (it must be a dust file): use the below code that points to the file that you want.
` {>"components/productList/cards.dust"/}`

#general sass
##Naming files 
If you want to create a sass file that you will import into `main.scss` or another file that will aggregate several files, prefix that file with an underscore. When you compile sass files, unless you prefix a file with an underscore (_), a new css file will be generated.

##mixins 
Mixins are similar to functions in programming, expect that they return a block of css.
###general usage:
```sass
.foo{ @include border-radius(5px); }
```

Or if you wanted to use it as the value to a property:
```sass
.foo { font-size: size(5px); }
```
###current mixins 
We have a few mixins at the moment that you can use in your css work:
1.	Border-radius: outputs a border radius based for all sides, with vendor prefixes. Example:
 ```css
.foo { @include border-radius(5px); }
```
 Output:
```css
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px
  background-clip: padding-box;
```

2.	Clearfix: a general mixin that clears floats. Example: 
```css
.foo { @include clearfix(); }
```
Output:
```sass
  *zoom: 1;
  &:before, &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
```

3.	 Opacity: another general mixin that outputs opacity values. Example:
```css
.foo { @include opacity(0.8); }
```
Output:
```css
  opacity: 0.8;
  filter: alpha(opacity=0.8);

4.	Transform: mixin used to transform elements. Example:
5.	
```css 
.foo { @include transform(1.1); }
```

Output:

```css
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
```


5.	Darken/Lighten: these are base bootstrap mixins that make a color lighter or darker. Example: 
```sass
lighten(<base color>, <percent by);
```
Base color is the starting color you want and the percent is how much the mixing will distort the color by. Darken works the exact same way.
##extensions 
Extensions are one of the most important parts of scss in regards to the DRY/OOCSS methodologies. The general principal is inheritance; that is if you have the following class: `.marginRight { margin-right: 5px; }` and you have 5 other class that have a margin right of 5px you can use the following: `.fooOtherClass { @extend .marginRight; }`. The reason you would use this method over including several classes in a selector deals mostly with complexity and the way that you write sass. For example, it would be much easier to use this method in the following css: 





```sass
.marginRight {
  margin-right: 5px;
} 
.prod-quantity {
  .btn {
    .glyphicon-refresh {
      &:before {
        @extend .marginRight;
      }
    }
    .glyphicon-trash {
      &:before {
        @extend .marginRight;
      }
    }
  }
}
````
Over the following css
```css
.prod-quantity .btn .glyphicon-refresh:before, .prod-quantity .btn .glyphicon-trash:before { margin-right: 5px;}
```

What happens when the sass gets compiled is, everything that is extended with margin right gets set aside and put into a new selector that is similar to the above css, while everything else is compiled into the selectors that they’re nested in.
The latter would get progressively more complex if you wanted to add more selectors over time and remove selectors that no longer exist. 
The sass above actually compiles into the latter css, but it’s much easier to navigate.

###placeholder selectors 
To continue with the above, one of the biggest downfalls is that the .marginRight class is compiled into the css, and if you have several of these types of classes, it can seriously inflate your stylesheets. The placeholder selector deals nicely with this; it is almost exactly the same as a normal css class, but it is prefixed with a percent symbol(%), and outside of what you’ve extended, is thrown away on compile.
Example 
```sass
%marginRight {
  margin-right: 5px;
} 
.prod-quantity {
  .btn {
    .glyphicon-refresh {
      &:before {
        @extend %marginRight;
      }
    }
    .glyphicon-trash {
      &:before {
        @extend %marginRight;
      }
    }
  }
}
````

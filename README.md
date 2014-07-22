The css used in UIRuntime uses scss as it’s precompiler. All pre-compiled scss can be found in the scss folder, the scss for bootstrap (mixins, functions and general scss) can be found under `vendor/bootstrap-sass/vendor/stylesheets` and all compiled css can be found under `public/stylesheets`.
`Main.scss` is where all scss is compiled from, no scss is to be written in it. You must import a stylesheet into `main.scss`: `@import "namespace/namespace";`
You do not need to add a file extension to the end (you can if you want to though);
All responsive scss must go in `responsive.scss`
The scss contains theme files (slate, spring), components and namespaces.
Theme files are for the various skins that clients can choose from. Each theme directory contains 3 files: _bootswatch, _variables, bootstrap and sometimes _test-vars.scss

1. Bootswatch contains all something…I don’t know
2. Variables contains all sass variables that will be used by bootstrap on compile. Variables include background color, hyperlink colors, navigation colors and text color.
3. Bootstrap is similar to main.scss, in that it compiles all the files for the theme.



Most of the time you will not need to edit any of the css in any of the above files.

Components contains the scss for all the custom components created by Digital River (and some overrides)
The objects folder contains html/css design pattern (such as the media object)
The pdpOneColumnBlock folder contains css/html for the pdp component that displays price, add to cart, product and product title.
The pdptwoColumnBlock folder is similar to the above, but with a different layout.
PdpTabs is the tab system component.

Namespace contains all the custom css written by Digital River. Whenever you write any new css for any pages for UIRuntime, it must go into the correct namespace. That is, if you were to add a selector to the full cart page, it must go under `namespace/cart/full`

To add a new page or namespace
1.	 Add a div or another markup element with an id within the naming convention to the dust view file
`<html><body><div id=”fullCart”></div>`

2.	In namespace.scss add a selector for your id and inside that selector import the file that contains the sass file for your page/component.
`#footer {@import "footer/footer";}`

To add a new theme to the display manager: 
1.	Open the GCPrimeSiteTool under `views/page/site-config.dust`
2.	The will be a set of options with the names of the current themes.
3.	Add the following code to the end of the options list
` <option value="<%themeName%>"{@if cond="'{site.template.presentationCss}' == '<%themeName%>'"} selected{/if}><%themeName%></option>`

Because bootstrap makes up a good portion of our css, we also have html partials. The various html/dust partials are located at views/components.
Currently we have 
1.	nav 
2.	pagination
3.	pdpTwoColumn
4.	pdpOneColumn
5.	product listings (basic and card layout)
6.	tab system
7.	header/footer.

To include an html/dust partial in your own dust file (it must be a dust file): use the below code that points to the file that you want.
` {>"components/productList/cards.dust"/}`

# react-native-simple-elements

[Storybook](https://react-native-simple-widgets.github.io/react-native-simple-elements)
## Get Started

### Installation
```shell
npm install react-native-simple-elements
```
### Usage

```js
import ThemeProviver from "react-native-simple-elements/components/theme/Provider";
import Button from 'react-native-simple-elements/components/Button';

<ThemeProviver>
    <Button
        onPress={() => console.log("Hello")}
    >
        Press Me
    </Button>
</ThemeProviver>
```

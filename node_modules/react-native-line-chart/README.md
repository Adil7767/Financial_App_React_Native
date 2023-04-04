
Forked from https://github.com/indiespirit/react-native-chart-kit

Same library, just smaller and optimised for the Blockspace.ch cryptocurrency App

[📲See example app](https://github.com/indiespirit/react-native-chart-kit-example)

# React Native Line Chart Documentation

## Import components
1. `yarn add react-native-line-chart`
2. Use with ES6 syntax to import components

```js
import { LineChart } from 'react-native-line-chart'
```

## Quick Example
```jsx
<View>
  <Text>
    Bezier Line Chart
  </Text>
  <LineChart
    data={{
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ]
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
```

## Chart style object
Define a chart style object with following properies as such:
```js
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
}
```

| Property        | Type           | Description  |
| ------------- |-------------| -----|
| backgroundGradientFrom | string | Defines the first color in the linear gradient of a chart's background  |
| backgroundGradientTo | string | Defines the second color in the linear gradient of a chart's background |
| color | function => string | Defines the base color function that is used to calculate colors of labels and sectors used in a chart |

## Responsive charts
To render a responsive chart, use `Dimensions` react-native library to get the width of the screen of your device like such
```js
import { Dimensions } from 'react-native'
const screenWidth = Dimensions.get('window').width
```

## Line Chart

![Line Chart](https://i.imgur.com/Wt26snd.jpg)

```js
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ]
  }]
}
```

```html
<LineChart
  data={data}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
/>
```

| Property        | Type           | Description  |
| ------------- |-------------| -----|
| data | Object | Data for the chart - see example above |
| width | Number | Width of the chart, use 'Dimensions' library to get the width of your screen for responsive |
| height | Number | Height of the chart |
| chartConfig | Object | Configuration object for the chart, see example config object above |

## Bezier Line Chart

![Line Chart](https://i.imgur.com/EnUiZZU.jpg)

```html
<LineChart
  data={data}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
  bezier
/>
```

| Property        | Type           | Description  |
| ------------- |-------------| -----|
| bezier | boolean | Add this prop to make the line chart smooth and curvy |


## More styling
Every charts also accepts `style` props, which will be applied to parent `svg` or `View` component of each chart.


### renderHorizontalLines(config)
Renders background horizontal lines like in the Line Chart and Bar Chart. Takes a config object with following properties:
```js
{
  // width of your chart
  width: Number,
  // height of your chart
  height: Number,
  // how many lines to render
  count: Number,
  // top padding from the chart top edge
  paddingTop: Number
}
```

### renderVerticalLabels(config)
Render background vertical lines. Takes a config object with following properties:
```js
{
  // data needed to calculate the number of lines to render
  data: Array,
  // width of your chart
  width: Number,
  // height of your chart
  height: Number,
  paddingTop: Number,
  paddingRight: Number
}
```

### renderDefs(config)
Render definitions of background and shadow gradients
```js
{
  // width of your chart
  width: Number,
  // height of your chart
  height: Number,
  // first color of background gradient
  backgroundGradientFrom: String,
  // second color of background gradient
  backgroundGradientTo: String
}
```

## More information
This library is built on top of the following open-source projects:
* react-native-chart-kit (https://github.com/indiespirit/react-native-chart-kit)
* react-native-svg (https://github.com/react-native-community/react-native-svg)
* paths-js  (https://github.com/andreaferretti/paths-js)

## Contribute
See the [contribution guide](contributing.md) and join [the contributors](https://github.com/indiespirit/react-native-chart-kit/graphs/contributors)!

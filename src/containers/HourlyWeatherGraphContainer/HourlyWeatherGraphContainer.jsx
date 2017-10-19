// // Deps
// import React, { Component } from 'react';
//
// // Sub-Components
// import HourlyWeatherGraphComponent from '../../components/HourlyWeatherGraphComponent/HourlyWeatherGraphComponent';
//
//
// export default class HourlyWeatherGraphContainer extends Component {
//   render() {
//     const{
//       RGBAVal,
//       activeColor,
//       hourlyGraphData
//     } = this.props
//     const graphArray = hourlyGraphData[0]
//     const graphArrayLength = graphArray.length
//     const graphLabelsArray = [...new Set(graphArray)]
//     const graphValuesArray = graphLabelsArray.map((label,index,array) => graphArray.filter((value,key,arr) => array[index] === value))
//     const graphDataSet = graphValuesArray.map((val,i,arr) => {
//       return {
//         label: [...new Set(arr.filter((label,index,array) => arr[i] === label)[0])].toString(),
//         value: `${Number(val.length)/Number(graphArrayLength)*100}%`
//       }
//     })
//     const graphCellIndexMapHandler = graphArray.map((item, i, arr) => arr[i-1] === arr[i] ? 0 : 1).map((item,i,arr) => i === 0 ? 0 : item)
//     const graphCellLabelMapHandler = graphArray.map(item => item).filter((label,i,arr) => i === 0 ? label : graphCellIndexMapHandler[i] === 1)
//     const graphCellWidthMapHandler = graphArray.map((cell,i,arr) => arr[i-1] === arr[i] ? false : cell)
//     const graphCellWidthMapHandlerFunc = () => {
//       return graphCellWidthMapHandler.filter((cell,i,arr) => {
//         return arr[i]
//       })
//     }
//
//     return (
//       <HourlyWeatherGraphComponent graphDataSet={ graphDataSet }
//                                    graphCellIndexMapHandler={ graphCellIndexMapHandler }
//                                    graphCellLabelMapHandler={ graphCellLabelMapHandler }
//                                    graphCellWidthMapHandler={ graphCellWidthMapHandler } {...this.props} />
//     );
//   }
// }

// $(function() {
//   React.renderComponent(
//     <div classname = "container">
//       <p>my first jsx component</p>
//     </div>,
//     document.getElementById('inject-here')
//   );
// })

// Create a component named MessageComponent
// var Machine = React.createClass({
//   getInitialState: function() {
//   },
//   render: function() {
//     return (
//       <div>{this.props.message}</div>
//     );
//   }
// });

// console.log('awooga', Machine);

// // Render an instance of MessageComponent into document.body
// React.render(
//   <Machine message="Hello!" />,
//   document.getElementsById('inject-here')
// );


class Machine extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>    
  }
}









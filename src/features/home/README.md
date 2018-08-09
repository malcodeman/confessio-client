ThemeProvider would have to wrap the children in a div if it accepts multiple children because it can only return a single component. If the user has to pass a single children to ThemeProvider he can decide whether a extra div is needed.

findMe() should only be called in Homepage componentDidMount()

```javascript
class Homepage extends Component {
  componentDidMount = () => {
    const { me, findMe } = this.props;
    if (me.username === "") {
      findMe();
    }
  };
```

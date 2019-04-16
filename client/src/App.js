import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Category from './views/Category';
import Header from './components/Header';
import API from './utils/productsAPI';


class App extends Component {

	state = {
		allCategories: [],
		mainCategories: [],
	}

	componentDidMount() {
		this.getAllCategories()
	}

	getAllCategories() {
		API.getAllCategories()
			.then(res =>
				this.setState({ allCategories: res.data.response.data }, () => {
					console.log(this.state.allCategories)
					const mainCategories = this.state.allCategories.filter(category => category.parent_id === 0 && category.is_visible === true)
					this.setState({mainCategories}, () => {
						console.log(this.state.mainCategories)
					})

				}))
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Header allCategories={this.state.allCategories} mainCategories={this.state.mainCategories}/>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/category" component={Category} />
						{
							this.state.mainCategories.map(tlc => {
								return <Route key={tlc.id} exact path={tlc.custom_url.url} component={Category} />
							})
						}
						{/* <Route exact path="/new" component={Category} /> */}
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;

var React = require('react');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var Reflux = require('reflux');
var ImagePreview = require('./image-preview');

module.exports = React.createClass({
	mixins: [
		Reflux.listenTo(ImageStore, 'onChange')
	],
	getInitialState: function(){
		return {
			images: []
		}
	},
	componentWillMount: function(){
		console.log('topic is about to render and fetch data');
		Actions.getImages(this.props.params.id)
	},
	componentWillReceiveProps: function(nextProps){
		Actions.getImages(nextProps.params.id);
	},
	render: function(){
		console.log('with this many iamges' + this.state.images.length)
		return <div className = "topic">
			{this.renderImages()}
		</div>
	},
	renderImages: function(){
		return this.state.images.slice(0, 15).map(function(image){
			return <ImagePreview key={image.id} {...image} />
		});
	},
	onChange: function(event, images){
		this.setState({images: images})
	}
})
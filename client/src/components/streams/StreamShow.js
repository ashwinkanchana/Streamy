import React from 'react'
import FlvJs from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';


class StreamShow extends React.Component {
    constructor(props) {
        super(props)
        this.videoRef = React.createRef()
    }

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
        this.buildPlayer()
    }

    buildPlayer(){
        if(this.flvPlayer || !this.props.stream){
            return
        }
        const { id } = this.props.match.params
        this.flvPlayer = FlvJs.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        this.flvPlayer.attachMediaElement(this.videoRef.current);
        this.flvPlayer.load();
    }

    componentDidUpdate(){
        this.buildPlayer()
    }

    componentWillUnmount(){
        this.flvPlayer.destroy()
    }

    render() {
        if (!this.props.stream) {
            return (<div>Loading...</div>)
        }

        const { title, description } = this.props.stream

        return (
            <div className="ui container">
                <video ref={this.videoRef}
                style={{ width: '100%'}}
                controls />

                <h1>{title}</h1>
                <h5>{description}</h5>
            </div >
            );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {
    fetchStream
})(StreamShow);
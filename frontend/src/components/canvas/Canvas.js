import React from 'react'
import { API_ROOT, HEADERS } from '../../constants';
import cable from '../../services/Cable'
import ToolBox from './ToolBox'
import { connect } from 'react-redux'

class Canvas extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.contextRef = React.createRef()
    this.state = {
      isDrawing: false,
      color: 'white',
      lineWidth: 7,
      drawings: [],
      canvasWidth: 500,
      canvasHeight: 500,
      roomId: this.props.match.params.id,
      canDraw: true,
      bgColor: '#000000'
    }
    this.dataCache = null
    this.canvasChannelRef = null
  }

  componentDidMount() {
    this.configCanvas()
    this.handleGetFetch()
    this.canvasChannel()
  }

  componentWillUnmount = () => {
    this.canvasChannelRef.unsubscribe()
  }

  handleGetFetch = () => {
    fetch(`${API_ROOT}/canvas/${this.state.roomId}`)
      .then(res => res.json())
      .then(drawings => this.setState({ drawings }))
  }

  canvasChannel = () => {
    this.canvasChannelRef = cable.subscriptions.create({
    channel: `CanvasChannel`,
    id: this.state.roomId
    },
      {connected: () => {
        console.log('CanvasChannel connected!')
      },
        disconnected: () => {
          console.log('CanvasChannel disconnected!')
        },
        received: data => {
          this.dataCache = data
          this.drawOnCanvas(data)
          //console.log('CanvasChannel data received', data)
        }
    })
  }

  handlePostFetch = drawingObj => {
    if ( this.dataCache === drawingObj ) { return }
    // kill it if it's a duplicate
    fetch(`${API_ROOT}/canvas`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(drawingObj)
    });
  }

  handleReceivedCanvasObj = response => {
    const { drawing } = response
    if (drawing !== this.state.drawings ) {
      this.setState({
        drawings: [...this.state.drawings, drawing]
      })
    }
  }

  startDrawing = (event) => {
    //console.log(event)
    if (this.state.isDrawing) {
      return
    }
    const {offsetX, offsetY} = event.nativeEvent
    this.setState({ isDrawing: true })
    this.handlePostFetch(
    {   action: 'beginPath',
        offsetX: offsetX,
        offsetY: offsetY,
        color: this.state.color,
        room_id: this.state.roomId
    })
  }

  stopDrawing = (event) => {
    if (!this.state.isDrawing) {
      return
    }
    const {offsetX, offsetY} = event.nativeEvent
    this.setState({ isDrawing: false })
    this.handlePostFetch(
    {   action: 'closePath',
        offsetX: offsetX,
        offsetY: offsetY,
        room_id: this.state.roomId
    })
  }

  drawing = (event) => {
    if (!this.state.isDrawing) {
      return
    }
    const {offsetX, offsetY} = event.nativeEvent
    this.handlePostFetch(
    {   action: 'lineTo',
        offsetX: offsetX,
        offsetY: offsetY,
        color: this.state.color,
        room_id: this.state.roomId
    })
  }

  configCanvas = () => {
    const canvas = this.canvasRef.current
    // double pixel depth for higher res
    // need .scale
    canvas.width = this.state.canvasWidth
    canvas.height = this.state.canvasHeight
    canvas.style.width = `${this.state.canvasWidth}px`
    canvas.style.height = `${this.state.canvasHeight}px`

    const context = canvas.getContext('2d')
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = this.state.color
    context.lineWidth = this.state.lineWidth
    context.miterLimit = 2
    this.contextRef.current = context
  }

  drawOnCanvas = (drawingObj) => {
    //console.log('hello', drawingObj);
    const {offsetX, offsetY, color} = drawingObj
    const canvas = this.contextRef.current
    switch (drawingObj.action) {
      case 'beginPath':
        //canvas.strokeStyle = 'red'
        canvas.beginPath()
        canvas.moveTo(offsetX, offsetY)
        this.setState({ isDrawing: true });
        canvas.stroke();
        canvas.strokeStyle = color
        break

      case 'lineTo':
        canvas.lineTo(offsetX, offsetY)
        canvas.stroke();
        break

      case 'closePath':
        canvas.closePath()
        //let saveVal = canvas.save();
        this.setState({ isDrawing: false })
        break

      case 'clearCanvas':
        canvas.fillStyle = this.state.bgColor
        canvas.fillRect(0, 0, this.state.canvasWidth, this.state.canvasHeight)
        break

      default:
        return
    }
  }

  handleColorChange = (color) => {
    this.setState({ color: color})
  }

  handleClearClick = (event) => {
    this.handlePostFetch(
    {   action: 'clearCanvas',
        room_id: this.state.roomId
    })
  }

  render() {
    //console.log('cable= ', cable)
    //console.log('this.canvasChannel', this.canvasChannel());
    const { currentUser, selectedRoom } = this.props

    return (

        currentUser.id === selectedRoom.drawer_id
        ?
        <React.Fragment>
          <canvas
            onMouseDown={event => this.startDrawing(event)}
            onMouseUp={event => this.stopDrawing(event)}
            onMouseMove={event => this.drawing(event)}
            onMouseLeave={event => this.stopDrawing(event)}
            ref={this.canvasRef}
          />
        <ToolBox handleClearClick={this.handleClearClick} handleColorChange={this.handleColorChange} color={this.state.color} />
        </React.Fragment>
        :
        <React.Fragment>
          <canvas ref={this.canvasRef} />
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
    currentUser: state.users.user,
  }
}

export default connect(mapStateToProps)(Canvas)

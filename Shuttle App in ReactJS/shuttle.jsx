/** @jsx React */
/**
*TimeTables Page
*Displays a table of all the intercampus shuttles
*Controller allows for filtering results by origin
*Click on shuttle to pick a seat and sign up
**/

//generate table row, when clicked on, generates view of all open seats in right bar
var ShuttleRow = React.createClass({
    handleClick: function() {
        this.props.onClick(this.props.index)
        this.props.seats = 0;
    },
    render: function() {
        var space = this.props.seats > 0 ? "open" : "full";
        return (
            <tr className={space} id={this.props.index} onClick={this.handleClick}>
                <td>{this.props.time}</td>
                <td>{this.props.seats}</td>
            </tr>                
        );
    }
});
//generate table and controls for filtering
var TimeTable = React.createClass({
    //passes up to the conroller
    selectShuttle: function (shuttleNumber) {
        this.props.selectShuttle(shuttleNumber);
    },
    countSeats: function(shuttle) {
        var count = 0;
        shuttle["seats"].forEach(function(seat){
            if (seat === 0){
                count++;
            }
        })
        return count;
    },
    render: function() {
        var rows = [];
        var index = 0;
        var schedule = this.props.schedule[this.props.origin];
        var selectShuttle = this.selectShuttle;
        var countSeats = this.countSeats;
        if (schedule !== undefined) {//hack...
            schedule.forEach(function(shuttle) {
                seatsLeft = countSeats(shuttle);
                time = shuttle["time"];
                rows.push(<ShuttleRow time={time} seats={seatsLeft} index={index++} onClick={selectShuttle}/>);
            });
        }        
        
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>From {this.props.origin}</th>
                        <th>Remaining Seats</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});
//controls, placed above table
var Options = React.createClass({
    handleChange: function(event) {
        this.props.onUserInput(
            event.target.value
        );
    },    
    render: function() {
        return (
            <select 
                className="form-control"
                ref = "shuttleOrigin"
                onChange = {this.handleChange}
                >
                <option value="Wilf">Wilf to Beren</option>
                <option value="Beren">Beren to Wilf</option>
            </select>
        );
    }
});
//accesses the database (JSON for now) and owns origin and shuttle data
var Controller = React.createClass({
    getInitialState: function() {
        return {
            origin: "Wilf",
            schedule: {},
            shuttleNumber: 0
        };
    },
    loadScheduleFromServer() {
        var source = "http://ycfac197.mc.yu.edu/~djavaher/project/schedule.php";
        $.get(source)
            .done(function(data) {
                this.setState({schedule: data});
            }.bind(this))
            .fail(function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this));
    },
    componentDidMount: function() {
        this.loadScheduleFromServer();
    },
    changeOrigin: function(origin) {
        this.setState({
            origin: origin,
        });
    },
    selectShuttle: function(shuttleNumber){
        this.setState({shuttleNumber:shuttleNumber})
        this.state.schedule[this.state.origin][this.state.shuttleNumber]["seats"][0] = 1;
        console.log(this.state.schedule[this.state.origin][this.state.shuttleNumber]["seats"]);        
        $("#info").text("Congratulations, you're signed up.").addClass("alert-success");
    },
    render: function() {
        return (
            <div className="schedule">
                <Options origin={this.state.origin} onUserInput = {this.changeOrigin}/>
                <TimeTable schedule={this.state.schedule} origin = {this.state.origin} selectShuttle={this.selectShuttle} />
                <SeatSelector shuttle={this.state.shuttle} origin = {this.state.origin}  seat = {this.signUp} />
            </div>
        );
    }
});
//frame for app with home page
var App = React.createClass ({
    render: function() {
        return (
            <div className="banner">
                <h1><ReactRouter.Link to="/">YUShuttles.com</ReactRouter.Link></h1>
                <h4 className="muted">Taking You Nowhere But Here </h4>
                <ul>
                    <li><ReactRouter.Link to="/"> Home </ReactRouter.Link></li>
                    <li><ReactRouter.Link to="shuttles"> Shuttles </ReactRouter.Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }  
})
//info text for homepage
var Home = React.createClass ({
    render: function() {
        return (
        <div className="home">
            <p>Wilf Campus Security</p>
            <p>
                (888) 987-2389 Toll Free, (212) 340-7796 \n 
                Sunday – Thursday: 11:45am-2:15am \n
                Friday: 9:00am – 1:30pm
            </p>
        </div>
        )
    }
})
//Seat Selector Page
//a seat on the shuttle - styled div
var ShuttleSeat = React.createClass({
    onClick: function(event) {
        if (this.props.occupancy === 0) {
            this.props.select(this.props.id);
        }
        else {
            $("#info").text("That seat is taken").addClass("alert-danger");               
        }
    },
    render: function() {
        return (
            <div className={this.props.occupancy}>
                {this.props.id}
            </div>
        );
    }
});
//places a register button on the page, not really sure how to mix in jQuery click events, so just doing it the way they describe in the tutorials
var Register = React.createClass({
    register : function() {
        this.props.confirm();
    },
    render: function() {
        return (
            <input type="button" value="Confirm" onClick={this.register}/>
        )
    }
})
//generates seat divs and determines if one has been selected in order to confirm the reservation
var SeatSelector = React.createClass({
    getInitialState: function() {
        return {
            seat: -1
        };
    },
    selectSeat:function(seatNumber) {
        this.setState({
            seat: seatNumber,
        });
    },
    confirm: function () {
        if (this.state.seat > -1) {
            this.props.signup(this.state.seat) //pass to parent's signup method that will edit the database array.
        }
        else {
            // $("#info")
            //     .text("Please pick a seat first")
            //     .addClass("alert-warning");   
        }
    },
    render: function() {
        var seats = [];
        var seatNumber = 1;
        if (this.props.shuttle !== undefined) {//hack...
            var shuttle = this.props.shuttle[this.props.origin];
            var select = this.selectSeat;
            shuttle["seats"].forEach(function(seat) {
                occupancy = seat === 0 ? "vacant" : "occupied";
                seats.push(<ShuttleSeat occupancy={occupancy} number={seatNumber++} select={select}  />);
            });
        }
        return (
            <div className="seatSelector">
                <div className="seats">
                    {seats}
                </div>
                <Register/>
            </div>
        );
    }
});
ReactDOM.render(
    <ReactRouter.Router history={ReactRouter.browserHistory}>
        <ReactRouter.Route path="/" component={App}>
            <ReactRouter.IndexRoute component={Home}/>
            <ReactRouter.Route path="shuttles" component={Controller}/>
        </ReactRouter.Route>
    </ReactRouter.Router>,
    document.getElementById('container')
);


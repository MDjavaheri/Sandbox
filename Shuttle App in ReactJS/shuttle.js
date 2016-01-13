/** @jsx React */
/**
*TimeTables Page
*Displays a table of all the intercampus shuttles
*Controller allows for filtering results by origin
*Click on shuttle to pick a seat and sign up
**/

//generate table row, when clicked on, generates view of all open seats in right bar
"use strict";

var ShuttleRow = React.createClass({
    displayName: "ShuttleRow",

    handleClick: function handleClick() {
        this.props.onClick(this.props.index);
        this.props.seats = 0;
    },
    render: function render() {
        var space = this.props.seats > 0 ? "open" : "full";
        return React(
            "tr",
            { className: space, id: this.props.index, onClick: this.handleClick },
            React(
                "td",
                null,
                this.props.time
            ),
            React(
                "td",
                null,
                this.props.seats
            )
        );
    }
});
//generate table and controls for filtering
var TimeTable = React.createClass({
    displayName: "TimeTable",

    //passes up to the conroller
    selectShuttle: function selectShuttle(shuttleNumber) {
        this.props.selectShuttle(shuttleNumber);
    },
    countSeats: function countSeats(shuttle) {
        var count = 0;
        shuttle["seats"].forEach(function (seat) {
            if (seat === 0) {
                count++;
            }
        });
        return count;
    },
    render: function render() {
        var rows = [];
        var index = 0;
        var schedule = this.props.schedule[this.props.origin];
        var selectShuttle = this.selectShuttle;
        var countSeats = this.countSeats;
        if (schedule !== undefined) {
            //hack...
            schedule.forEach(function (shuttle) {
                seatsLeft = countSeats(shuttle);
                time = shuttle["time"];
                rows.push(React(ShuttleRow, { time: time, seats: seatsLeft, index: index++, onClick: selectShuttle }));
            });
        }

        return React(
            "table",
            { className: "table table-striped" },
            React(
                "thead",
                null,
                React(
                    "tr",
                    null,
                    React(
                        "th",
                        null,
                        "From ",
                        this.props.origin
                    ),
                    React(
                        "th",
                        null,
                        "Remaining Seats"
                    )
                )
            ),
            React(
                "tbody",
                null,
                rows
            )
        );
    }
});
//controls, placed above table
var Options = React.createClass({
    displayName: "Options",

    handleChange: function handleChange(event) {
        this.props.onUserInput(event.target.value);
    },
    render: function render() {
        return React(
            "select",
            {
                className: "form-control",
                ref: "shuttleOrigin",
                onChange: this.handleChange
            },
            React(
                "option",
                { value: "Wilf" },
                "Wilf to Beren"
            ),
            React(
                "option",
                { value: "Beren" },
                "Beren to Wilf"
            )
        );
    }
});
//accesses the database (JSON for now) and owns origin and shuttle data
var Controller = React.createClass({
    displayName: "Controller",

    getInitialState: function getInitialState() {
        return {
            origin: "Wilf",
            schedule: {},
            shuttleNumber: 0
        };
    },
    loadScheduleFromServer: function loadScheduleFromServer() {
        var source = "http://ycfac197.mc.yu.edu/~djavaher/project/schedule.php";
        $.get(source).done((function (data) {
            this.setState({ schedule: data });
        }).bind(this)).fail((function (xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }).bind(this));
    },
    componentDidMount: function componentDidMount() {
        this.loadScheduleFromServer();
    },
    changeOrigin: function changeOrigin(origin) {
        this.setState({
            origin: origin
        });
    },
    selectShuttle: function selectShuttle(shuttleNumber) {
        this.setState({ shuttleNumber: shuttleNumber });
        this.state.schedule[this.state.origin][this.state.shuttleNumber]["seats"][0] = 1;
        console.log(this.state.schedule[this.state.origin][this.state.shuttleNumber]["seats"]);
        $("#info").text("Congratulations, you're signed up.").addClass("alert-success");
    },
    render: function render() {
        return React(
            "div",
            { className: "schedule" },
            React(Options, { origin: this.state.origin, onUserInput: this.changeOrigin }),
            React(TimeTable, { schedule: this.state.schedule, origin: this.state.origin, selectShuttle: this.selectShuttle }),
            React(SeatSelector, { shuttle: this.state.shuttle, origin: this.state.origin, seat: this.signUp })
        );
    }
});
//frame for app with home page
var App = React.createClass({
    displayName: "App",

    render: function render() {
        return React(
            "div",
            { className: "banner" },
            React(
                "h1",
                null,
                React(
                    ReactRouter.Link,
                    { to: "/" },
                    "YUShuttles.com"
                )
            ),
            React(
                "h4",
                { className: "muted" },
                "Taking You Nowhere But Here "
            ),
            React(
                "ul",
                null,
                React(
                    "li",
                    null,
                    React(
                        ReactRouter.Link,
                        { to: "/" },
                        " Home "
                    )
                ),
                React(
                    "li",
                    null,
                    React(
                        ReactRouter.Link,
                        { to: "shuttles" },
                        " Shuttles "
                    )
                )
            ),
            this.props.children
        );
    }
});
//info text for homepage
var Home = React.createClass({
    displayName: "Home",

    render: function render() {
        return React(
            "div",
            { className: "home" },
            React(
                "p",
                null,
                "Wilf Campus Security"
            ),
            React(
                "p",
                null,
                "(888) 987-2389 Toll Free, (212) 340-7796 \\n Sunday – Thursday: 11:45am-2:15am \\n Friday: 9:00am – 1:30pm"
            )
        );
    }
});
//Seat Selector Page
//a seat on the shuttle - styled div
var ShuttleSeat = React.createClass({
    displayName: "ShuttleSeat",

    onClick: function onClick(event) {
        if (this.props.occupancy === 0) {
            this.props.select(this.props.id);
        } else {
            $("#info").text("That seat is taken").addClass("alert-danger");
        }
    },
    render: function render() {
        return React(
            "div",
            { className: this.props.occupancy },
            this.props.id
        );
    }
});
//places a register button on the page, not really sure how to mix in jQuery click events, so just doing it the way they describe in the tutorials
var Register = React.createClass({
    displayName: "Register",

    register: function register() {
        this.props.confirm();
    },
    render: function render() {
        return React("input", { type: "button", value: "Confirm", onClick: this.register });
    }
});
//generates seat divs and determines if one has been selected in order to confirm the reservation
var SeatSelector = React.createClass({
    displayName: "SeatSelector",

    getInitialState: function getInitialState() {
        return {
            seat: -1
        };
    },
    selectSeat: function selectSeat(seatNumber) {
        this.setState({
            seat: seatNumber
        });
    },
    confirm: function confirm() {
        if (this.state.seat > -1) {
            this.props.signup(this.state.seat); //pass to parent's signup method that will edit the database array.
        } else {
                // $("#info")
                //     .text("Please pick a seat first")
                //     .addClass("alert-warning");  
            }
    },
    render: function render() {
        var seats = [];
        var seatNumber = 1;
        if (this.props.shuttle !== undefined) {
            //hack...
            var shuttle = this.props.shuttle[this.props.origin];
            var select = this.selectSeat;
            shuttle["seats"].forEach(function (seat) {
                occupancy = seat === 0 ? "vacant" : "occupied";
                seats.push(React(ShuttleSeat, { occupancy: occupancy, number: seatNumber++, select: select }));
            });
        }
        return React(
            "div",
            { className: "seatSelector" },
            React(
                "div",
                { className: "seats" },
                seats
            ),
            React(Register, null)
        );
    }
});
ReactDOM.render(React(
    ReactRouter.Router,
    { history: ReactRouter.browserHistory },
    React(
        ReactRouter.Route,
        { path: "/", component: App },
        React(ReactRouter.IndexRoute, { component: Home }),
        React(ReactRouter.Route, { path: "shuttles", component: Controller })
    )
), document.getElementById('container'));
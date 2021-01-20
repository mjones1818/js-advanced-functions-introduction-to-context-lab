// Your code here
function createEmployeeRecord(employee) {
  // debugger
  let [firstName, familyName, title, payPerHour] = employee
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords (employees) {
  return employees.map(function(employee) { return createEmployeeRecord(employee)})
}

function createTimeInEvent(employee, timeStamp) {
  
  employee.timeInEvents.push(
    {
      type: 'TimeIn',
      hour: parseInt(timeStamp.split(' ')[1]),
      date: timeStamp.split(' ')[0]
    }
  )
  return employee
}

function createTimeOutEvent(employee, timeStamp) {
  
  employee.timeOutEvents.push(
    {
      type: 'TimeOut',
      hour: parseInt(timeStamp.split(' ')[1]),
      date: timeStamp.split(' ')[0]
    }
  )
  return employee
}

function hoursWorkedOnDate(employee, date) {
  let inEvent = employee.timeInEvents.find(e => e.date === date)
  let outEvent = employee.timeOutEvents.find(e => e.date === date)
  return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
  return (hoursWorkedOnDate(employee,date) * employee.payPerHour)
}

function allWagesFor(employee) {
  let dates = employee.timeInEvents.map(function(e){return e.date})
  let payable = dates.reduce(function(total, date){
    return total + wagesEarnedOnDate(employee,date)
  },0)
  return payable
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find(function(rec){
    return rec.firstName === firstName
  })
}

function calculatePayroll (employees) {
  let pay = employees.map(function(rec){
    return allWagesFor(rec)
  })
  return pay.reduce(function(total, day){
    return total + day
  },0)
}
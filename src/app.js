class Sample {
  sampleMessage() {
    return "Sample class.";
  }
}
let sample = new Sample();
let res = sample.sampleMessage();
console.log(res);

var sampleFunction = () => {
  var message = 'Sample function.';
  console.log(message);
};

sampleFunction();

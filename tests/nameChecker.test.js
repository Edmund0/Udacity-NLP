// Import the js file to test
import { checkForName } from "../src/client/js/nameChecker"

describe("Testing the nameChecker functionality", () => {
	test("Testing the checkForName() function", () => {
		  // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
		  expect(checkForName).toBeDefined();
	})});
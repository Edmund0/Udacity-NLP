// Import the js file to test
import { checkForName } from "../src/client/js/nameChecker"

describe("Testing the nameChecker functionality", () => {
	test("Testing the checkForName() function", () => {

			Object.defineProperty(global, "window", {
				value: {
					alert: jest.fn()
				}
			});

			// The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
			const mockFn = jest.spyOn(window, 'alert').mockImplementation(() => {});

			expect(checkForName).toBeDefined();
			expect(checkForName("Picard")).toBeTruthy();
			expect(mockFn).toHaveBeenCalledWith("Welcome, Captain!");
			expect(checkForName("Janeway")).toBeTruthy();
			expect(mockFn).toHaveBeenCalledWith("Welcome, Captain!");
			expect(checkForName("Kirk")).toBeTruthy();
			expect(mockFn).toHaveBeenCalledWith("Welcome, Captain!");
			expect(checkForName("Archer")).toBeTruthy();
			expect(mockFn).toHaveBeenCalledWith("Welcome, Captain!");
			expect(checkForName("Georgiou")).toBeTruthy();
			expect(mockFn).toHaveBeenCalledWith("Welcome, Captain!");
			jest.clearAllMocks();
			expect(checkForName("Spark")).toBeFalsy();
			expect(mockFn).not.toHaveBeenCalled();

		  
	})});

	//If the input is valid allow the API calls else raise proper alerts. 
	
import terminal from "../src/terminal";

test("It calls command from given input", () => {
  const input = "l here";
  const mockCommand = jest.fn();
  const commandList = { l: mockCommand };

  const result = terminal(input, {}, commandList);

  expect(result).toBeTruthy();
  expect(mockCommand.mock.calls).toHaveLength(1);
});

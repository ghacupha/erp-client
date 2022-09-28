import { DropdownQuestion, IQuestionBase, TextareaQuestion, TextboxQuestion } from './question-base.model';

describe('QuestionBase models', () => {

  let txtBoxQuestion: IQuestionBase<string>;
  let txtAreaQuestion: IQuestionBase<string>;
  let dropDownQuestion: IQuestionBase<string>;

  beforeEach(() => {
    txtBoxQuestion = new TextboxQuestion(
        1001,
        'valT',
        'key3',
        'label1',
        false,
        2,
        'text box question',
        false,
      [],
      [],
      'textbox',
      '',
    );

    txtAreaQuestion = new TextareaQuestion(
        1001,
        'value',
        'key1',
        'TextLabel',
        false,
        2,
        'textbox', // proving that this assignment will be relevant
      true,
      [],
      [],
      0,
      0,
      0,
      0,
    );

    dropDownQuestion = new DropdownQuestion(
        1001,
        'value2',
        'key4',
        'label5',
        false,
        2,
        'textbox', // proving that this assignment will be relevant
      false,
      [],
      [],
    );
  });

  it('Text Box Question should be truthy', () => {
    expect(txtBoxQuestion).toBeTruthy();
  });

  it('Text Area Question should be truthy', () => {
    expect(txtAreaQuestion).toBeTruthy();
  });

  it('Dropdown Question should be truthy', () => {
    expect(dropDownQuestion).toBeTruthy();
  });

  it('The dropdown question is fool proof', () => {
    expect(dropDownQuestion.controlType).toEqual('dropdown');
  });

  it('The textarea question is fool proof', () => {
    expect(txtAreaQuestion.controlType).toEqual('textarea');
  });

  it('The textbox question is fool proof', () => {
    expect(txtBoxQuestion.controlType).toEqual('textbox');
  });
})

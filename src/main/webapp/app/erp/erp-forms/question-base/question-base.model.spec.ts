import { DropdownQuestion, IQuestionBase, TextareaQuestion, TextboxQuestion } from './question-base.model';

describe('QuestionBase models', () => {

  let txtBoxQuestion: IQuestionBase<string>;
  let txtAreaQuestion: IQuestionBase<string>;
  let dropDownQuestion: IQuestionBase<string>;

  beforeEach(() => {
    txtBoxQuestion = new TextboxQuestion(
      {
        id: 1001,
        value: '',
        key: '',
        label: '',
        required: false,
        order: 2,
        controlType: 'textbox',
      },
      'text',
      0,
      0,
      '',
    );

    txtAreaQuestion = new TextareaQuestion(
      {
        id: 1001,
        value: '',
        key: '',
        label: '',
        required: false,
        order: 2,
        controlType: 'textbox', // proving that this assignment will be relevant
      },
      0,
      0,
      0,
      0
    );

    dropDownQuestion = new DropdownQuestion(
      {
        id: 1001,
        value: '',
        key: '',
        label: '',
        required: false,
        order: 2,
        controlType: 'textbox', // proving that this assignment will be relevant
      }
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

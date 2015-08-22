
import React from 'react';
import Avatar from './components/core/Avatar';
import TabsControl from './components/core/Tabs';
import PaperInput from './components/core/PaperInput';
import PaperTextArea from './components/core/PaperTextArea';
import FlatButton from './components/core/FlatButton';
import PaperButton from './components/core/PaperButton';
import FabButton from './components/core/FabButton';
import FabButtonGroup from './components/core/FabButtonGroup';
import Card from './components/core/Card';
import Modal from './components/core/Modal';
import DropDownMenu from './components/core/DropDownMenu';
import IconButton from './components/core/IconButton';
import IconMenu from './components/core/IconMenu';
import LeftNavBar from './components/core/LeftNavigationBar';
import List from './components/core/List';
import Slider from './components/core/Slider';
import Switch from './components/core/Switch';
import Checkbox from './components/core/Checkbox';
import RadioElement from './components/core/RadioElement';
import TableControl from './components/core/TableControl';
import DatePicker from './components/core/Picker';
import ProgressBar from './components/core/ProgressBar';
import FileInput from './components/core/FileInput';
import AccordianElem from './components/core/AccordianElem';
import SnackBar from './components/core/SnackBar';
import Label from './components/core/Label';
import MultipleComponent from './components/core/MultipleComponent';

var AppComponent = React.createClass({
  showModal: function() {

    let _actions = [{
      text: 'cancel'
    }, {
      text: 'submit',
      action: function() {}
    }], _header = 'Modal Header goes here',
    _content = "Hello, this is the modal content. We would dispatch an action which a Store then reacts on by\
    providing a callback to the Web Api that will eventually change the state of a Store.";

    React.unmountComponentAtNode(document.getElementById('modalContainer'));
    React.render(<Modal actions={ _actions } header={ _header }>
     { _content }
    </Modal>, document.getElementById('modalContainer'));
  },
  showPanel: function() {

    let _items = {
      'APPLICATION': [{
        'All Apps': '#'
      }, {
        'Create App': '#'
      }],
      'COMPONENTS': [{
        'All Components': '#'
      }, {
        'Create Component': '#'
      }]
    }

    React.unmountComponentAtNode(document.getElementById('leftNav'));
    React.render(<LeftNavBar isShown={ true } items={ _items } />, document.getElementById('leftNav'));

  },
  showSnackBar: function() {
    React.unmountComponentAtNode(document.getElementById('snackbar'));
    React.render(<SnackBar icon='check' message="I am a snackbar!" />, document.getElementById('snackbar'));
  },
  componentDidMount: function() {
    $(window).scrollTop(0);
  },
  render: function() {

    let _listItems = [
        {
          icon: 'account_circle',
          text: 'USER ACCOUNT',
          href: "#",
          isHash: true
        },
        {
          icon: 'data_usage',
          text: 'DATA USAGE',
          href: "#",
          isHash: true
        },
        {
          icon: 'cloud_circle',
          text: 'CLOUD INSTANCE',
          href: "#",
          isHash: true
        },
        {
          icon: 'navigation',
          text: 'NAVIGATION',
          href: "#",
          isHash: true
        }
      ];

    return (
      <div>
        <div className="row">
          <div className="col-md-3" style={{
          backgroundColor: '#C62828',
          height: '4px'
        }}></div>
          <div className="col-md-3" style={{
          backgroundColor: '#2196F3',
          height: '4px'
        }}></div>
          <div className="col-md-3" style={{
          backgroundColor: '#009688',
          height: '4px'
        }}></div>
          <div className="col-md-3" style={{
          backgroundColor: '#FFC107',
          height: '4px'
        }}></div>
        </div>
        <table>
          <tr>
            <td>
              <h1 style={{ fontFamily: 'Riona-Medium', fontSize:'8rem'}}>FLASH</h1>
            </td>
            <td style={{paddingLeft:'1rem'}}>
              <img src='./images/flash.png' width='60px' style={{marginTop:'-0.5rem'}} />
            </td>
          </tr>
        </table>
        <h4 style={{marginTop:'-1rem'}}>Material Design inspired React components</h4>
        <hr/>
        <br/>
        <div className='componentsList'>
          <div className='eachComponent'>
            <h3>Avatar</h3>
            <Avatar src='./images/supportmale-512.png' />
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Accordian</h3>
            <AccordianElem
              items={
                [{
                  header: 'Item One',
                  content: 'Cards are a convenient means of displaying content composed of different elements.\
                  They are also well-suited for showcasing elements whose size or supported actions vary, \
                  like photos with captions of variable length.'
                },
                {
                  header: 'Item Two',
                  content: 'Card content type and quantity can vary greatly. Cards within a card collection can\
                  each contain a unique data set. For example, various cards within a card collection might contain\
                  a checklist with an action, a note with an action, and a note with a photo.\
                  Cards provide context and an entry point to more robust information and views. Dont overload\
                  cards with extraneous information or actions.'
                },
                {
                  header: 'Item Three',
                  content: 'Use hierarchy within the card to direct users’ attention to the most important\
                  information. For example, place primary content at the top of the card, or use typography to\
                  emphasize primary content.'
                }]
              }
            />
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Text Fields</h3>
            <div className='row'>
              <div className='col-md-6'>
                <h4>Text Input fields</h4>
                <PaperInput placeholder='username' /> <br/><br/>
                <PaperInput placeholder='username' value='abinash.m' /> <br/><br/>
                <PaperInput placeholder='username' value='abinash.m' disabled={ true } />
              </div>
              <div className='col-md-6'>
                <h4>Text Area fields</h4>
                <PaperTextArea placeholder='description' /> <br/><br/>
                <PaperTextArea
                  placeholder='description'
                  charLimit={100}
                  value='Tables may require basic text editing (e.g. editing existing text or adding comments).' />
                <br/><br/>
                <PaperTextArea
                  placeholder='description'
                  disabled={ true }
                  value='Tables may require basic text editing (e.g. editing existing text or adding comments).' />
              </div>
            </div>
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Buttons</h3>
            <h5>A button clearly communicates what action will occur when the user touches it. It consists of text, an image, or both, designed in accordance with your app’s color theme.</h5>
            <TabsControl>
              <div>
                <div>Flat Button</div>
                <div>
                  <h5>A button made of ink that displays ink reactions on press but does not lift. Button links are non-raised buttons but otherwise behave like normal buttons.</h5>
                  <br/>
                  <FlatButton>submit</FlatButton>
                  <FlatButton type='green'>clear</FlatButton>
                </div>
              </div>
              <div>
                <div>Raised Button</div>
                <div>
                  <h5>A typically rectangular material button that lifts and displays ink reactions on press.</h5>
                  <h5 className='boldFont'>Without icons</h5>
                  <div className='row'>
                    <div className='col-md-2'>
                      <PaperButton>submit</PaperButton>
                    </div>
                    <div className='col-md-2'>
                      <PaperButton type='green'>submit</PaperButton>
                    </div>
                    <div className='col-md-2'>
                      <PaperButton type='amber'>submit</PaperButton>
                    </div>
                    <div className='col-md-6'>
                      <PaperButton type='danger'>submit</PaperButton>
                    </div>
                  </div>
                  <br/>
                  <h5 className='boldFont'>With icons</h5>
                  <div className='row'>
                    <div className='col-md-2'>
                      <PaperButton icon='search'>search</PaperButton>
                    </div>
                    <div className='col-md-2'>
                      <PaperButton type='green' icon='save'>create</PaperButton>
                    </div>
                    <div className='col-md-2'>
                      <PaperButton type='amber' icon='signal_wifi_off'>wifi off</PaperButton>
                    </div>
                    <div className='col-md-6'>
                      <PaperButton type='danger' icon='delete'>delete</PaperButton>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>Floating Action Button</div>
                <div>
                  <h5>
                  A circular material button that lifts and displays an ink reaction on press. Floating action buttons are used for a promoted action. They are distinguished by a circled icon floating above the UI and have motion behaviors that include morphing, launching, and a transferring anchor point.
                  </h5>
                  <br/><br/>
                  <div className='row'>
                    <div className='col-md-6'>
                      <h5 className='boldFont'>Single floating action button</h5>
                      <p>Only one floating action button is recommended per screen to increase its prominence. It should represent only the most common action.</p>
                      <div className='row'>
                        <div className='col-md-2'>
                          <FabButton tooltip="create" placement="bottom">
                            <i className="material-icons">add</i>
                          </FabButton>
                        </div>
                        <div className='col-md-2'>
                          <FabButton tooltip="edit" placement="bottom" type='green'>
                            <i className="material-icons">edit</i>
                          </FabButton>
                        </div>
                        <div className='col-md-2'>
                          <FabButton tooltip="apps" placement="bottom" type='amber'>
                            <i className="material-icons">apps</i>
                          </FabButton>
                        </div>
                        <div className='col-md-6'>
                          <FabButton tooltip="delete" placement="bottom" type='danger'>
                            <i className="material-icons">clear</i>
                          </FabButton>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <h5 className='boldFont'>Floating action button with children</h5>
                      <p>As a general rule, have at least three options upon press but not more than six, including the original floating action button target. If you have two options—i.e. your floating action button only flings out one other choice —choose which action is most important. If you have more than six, users may have trouble reaching the furthest option.</p>
                      <FabButtonGroup>
                        <FabButton tooltip="edit" placement="right">
                          <i className="material-icons">mode_edit</i>
                        </FabButton>
                        <FabButton tooltip="delete" placement="right">
                          <i className="material-icons">delete</i>
                        </FabButton>
                      </FabButtonGroup>
                    </div>
                  </div>
                </div>
              </div>
            </TabsControl>
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Cards</h3>
            <p>
            A card is a piece of paper with unique related data that serves as an entry point to more detailed information. For example, a card could contain a photo, text, and a link about a single subject.
            <br/>
            Cards have a constant width and variable height. The maximum height is limited to the height of the available space on a platform, but it can temporarily expand (for example, to display a comment field). Cards do not flip over to reveal information on the back.</p>
            <div className='row'>
              <div className='col-md-8'>
                <h5>Rich-Media card</h5>
                <Card
                  type='rich-media'
                  title='Lean On by Major Lazer and DJ Snake featuring MØ'
                  content='Lean On is a song recorded by American EDM group Major Lazer and French music
                  producer DJ Snake for Major Lazers third studio album, Peace Is the Mission (2015). The song
                  features vocals from Danish singer MØ. It was produced by Major Lazer and DJ Snake, and written
                   by MØ, Major Lazer member Diplo, DJ Snake, Jr. Blender and Martin Bresso.'
                  richMediaSrc="./images/600b.jpg"
                />
              </div>
            </div>
            <br/><br/>
            <div className='row'>
              <div className='col-md-6'>
                <h5>Basic card</h5>
                <Card
                  type='basic'
                  title='Paris!'
                  content={
                    <div className='row'>
                      <div className='col-md-9'>
                      Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy
                       and culture. Its picturesque 19th-century cityscape is crisscrossed by wide boulevards and the River
                        Seine.
                      </div>
                      <div className='col-md-3'>
                        <img src='./images/paris.jpg' style={{width:'100%'}} />
                      </div>
                    </div>
                  }
                />
              </div>
              <div className='col-md-6'>
                <h5>Colored card</h5>
                <Card
                  type='colored'
                  title='Paris!'
                  content={
                    <div className='row'>
                      <div className='col-md-9'>
                      Paris, France's capital, is a major European city and a global center for art, fashion,
                      gastronomy and culture. Its picturesque 19th-century cityscape is crisscrossed by wide
                      boulevards and the River Seine.
                      </div>
                      <div className='col-md-3'>
                        <img src='./images/paris.jpg' style={{width:'100%'}} />
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
            <br/><br/>
            <div className='row'>
              <div className='col-md-6'>
                <h5>Underlined card</h5>
                <Card
                  type='underlined'
                  title='Hello World!'
                  content='Since the Ice Cream Sandwich release, Roboto has been the standard typeface on Android. Since\
                  Froyo, Noto has been the standard typeface on Android for all languages not covered by Roboto. Noto is also\
                  the standard typeface for all languages on Chrome OS.'
                />
              </div>
              <div className='col-md-6'>
                <h5>Solid-header card</h5>
                <Card
                  type='solid-header'
                  title='Hello World!'
                  content='Since the Ice Cream Sandwich release, Roboto has been the standard typeface on Android. Since\
                  Froyo, Noto has been the standard typeface on Android for all languages not covered by Roboto. Noto is also\
                  the standard typeface for all languages on Chrome OS.'
                />
              </div>
            </div>
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Dialog</h3>
            <p>
              Dialogs inform users about critical information, require users to make decisions, or encapsulate multiple tasks within a discrete process. Use dialogs sparingly because they are interruptive in nature. Their sudden appearance forces users to stop their current task and refocus on the dialog content. Not every choice, setting, or detail warrants interruption and prominence.
            </p>
            <PaperButton clickHandler={ this.showModal }>show modal</PaperButton>
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <div className='row'>
              <div className='col-md-3'>
                <h3>Dropdown Menu</h3>
                <DropDownMenu items={['Lumia 530', 'iPhone 6S', 'Nexus 6', 'XPeria Z3']} />
              </div>
              <div className='col-md-9'></div>
            </div>
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Icon Menus</h3>
            <div className='row'>
              <div className='col-md-3'>
                <h5>Top-Left</h5>
                <IconMenu openDirection='top-left' items={['apple', 'orange', 'pineapple']} />
              </div>
              <div className='col-md-3'>
                <h5>Top-Right</h5>
                <IconMenu openDirection='top-right' items={['apple', 'orange', 'pineapple']} />
              </div>
              <div className='col-md-3'>
                <h5>Bottom-Left</h5>
                <IconMenu openDirection='bottom-left' items={['apple', 'orange', 'pineapple']} />
              </div>
              <div className='col-md-3'>
                <h5>Bottom-Right</h5>
                <IconMenu openDirection='bottom-right' items={['apple', 'orange', 'pineapple']} />
              </div>
            </div>
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Navigation Panel</h3>
            <PaperButton clickHandler={ this.showPanel }>show panel</PaperButton>
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Lists</h3>
            <p>
              Lists present multiple line items in a vertical arrangement as a single continuous element. A list consists of a single continuous column of tessellated sub-divisions of equal width called rows that function as containers for tiles.
            </p>
            <div className='row'>
              <div className='col-md-8'>
                <List items={ _listItems } />
              </div>
              <div className='col-md-4'></div>
            </div>
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Date Picker</h3>
            <DatePicker showTimeSelect={true} />
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Selection Controls</h3>
            <div className='row'>
              <div className='col-md-12'>
                <h4>CHECKBOX</h4>
                <Checkbox checked={false} label='show details' />
                <Checkbox checked={true} label='remember me' />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-6'>
                <h4>SLIDER</h4>
                <h5>Normal slider</h5>
                <Slider min={0} max={100} value={59} />
                <br/><br/>
                <Slider color='green' min={0} max={100} value={26} />
              </div>
              <div className='col-md-6'>
                <h4 style={{opacity:0}}>test</h4>
                <h5>Pin slider</h5>
                <Slider type='pin' min={0} max={100} value={59} />
                <br/><br/><br/>
                <Slider type='pin' color='green' min={0} max={100} value={80} />
              </div>
            </div>
            <br/><br/>
            <h4>SWITCH</h4>
            <div className='row'>
              <div className='col-md-1'>
                <Switch checked={true} />
              </div>
              <div className='col-md-1'>
                <Switch type='green' checked={false} />
              </div>
              <div className='col-md-1'>
                <Switch type='amber' checked={true} />
              </div>
              <div className='col-md-9'>
                <Switch type='danger' checked={false} />
              </div>
            </div>
            <br/><br/>
            <div className='row'>
              <div className='col-md-12'>
                <h4>RADIO</h4>
                <RadioElement
                  items={
                    [
                      {label:'iOS', value:'ios', selected: true},
                      {label:'Android', value:'android', selected: false},
                      {label:'Windows Phone', value:'windows', selected: false}
                    ]
                  }
                />
              </div>
            </div>
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Data Table</h3>
            <p>
            Data tables are used to present raw data sets, and usually appear in desktop enterprise products.

Data sets may include:

Three or more columns of data
A corresponding visualization
The ability for users to query and manipulate data at scale
            </p>
            <TableControl rows={
              [
                ['Dessert', 'Calories', 'Fat', 'Carbs', 'Protein', 'Sodium'],
                ['Frozen Yogurt', 159, 6, 24, 4.0, 89],
                ['Ice Cream Sandwich', 237, 9.0, 37, 4.3, 129],
                ['Eclair', 262, 16.0, 24, 6.0, 337],
                ['Cupcake', 305, 3.7, 67, 4.3, 413]
              ]
            } />
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Progress</h3>
            <br/>
            <h5>Indeterminate</h5>
            <ProgressBar />
            <br/><br/>
            <h5>Determinate</h5>
            <ProgressBar type='determinate' min={0} max={50} value={34} />
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Tabs</h3>
            <TabsControl>
              <div>
                <div>Tab One</div>
                <div>
                  Tab One content goes here.<br/>This is an example of a tab template! You can put
                  any sort of HTML or react component in here. It even keeps the component state!
                  <br/><br/>
                  <div className='row'>
                    <div className='col-md-4'>
                      <h5>Total aggregate</h5>
                      <Slider min={0} max={100} value={59} />
                    </div>
                    <div className='col-md-8'></div>
                  </div>
                  <br/><br/>
                </div>
              </div>
              <div>
                <div>Tab Two</div>
                <div>
                  This is another example of a tab template!
                  <br/><br/>
                  <PaperTextArea placeholder='enter description' />
                </div>
              </div>
              <div>
                <div>Tab Three</div>
                <div>
                  This is yet another example of a tab template!
                  <br/><br/>
                  <PaperInput placeholder='enter your name' />
                </div>
              </div>
            </TabsControl>
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Snackbar</h3>
            <h5>Snackbars provide lightweight feedback about an operation by showing a brief message at the bottom of the screen. Snackbars can contain an action.</h5>
            <PaperButton clickHandler={ this.showSnackBar }>show snackbar</PaperButton>
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Labels</h3>
            <div className='row'>
              <div className='col-md-6'>
                <h5>default label</h5>
                <Label type='default'>
                  Instead of editing text, users may need to select from a predefined list of options.
                </Label>
              </div>
              <div className='col-md-6'>
                <h5>success label</h5>
                <Label type='success'>
                  Instead of editing text, users may need to select from a predefined list of options.
                </Label>
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-6'>
                <h5>info label</h5>
                <Label type='info'>
                  Instead of editing text, users may need to select from a predefined list of options.
                </Label>
              </div>
              <div className='col-md-6'>
                <h5>warning label</h5>
                <Label type='warning'>
                  Instead of editing text, users may need to select from a predefined list of options.
                </Label>
              </div>
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-md-6'>
              <h5>error label</h5>
              <Label type='error'>
                Instead of editing text, users may need to select from a predefined list of options.
              </Label>
            </div>
            <div className='col-md-6'></div>
          </div>
        </div>
        <br/><br/>
        <div className='eachComponent'>
          <h3>File Input</h3>
          <div className='row'>
            <div className='col-md-12'>
              <FileInput />
            </div>
          </div>
        </div>
        <br/><br/>
        <div className='eachComponent'>
          <h3>Multiple Component</h3>
          <div className='row'>
            <div className='col-md-4'>
              <h5>User list</h5>
              <MultipleComponent
                tooltip='user'
                component={ <PaperInput placeholder='user' /> }
                value={['Pete Hunt', 'Chris Chadeau', 'Lee Byron']}
              />
            </div>
            <div className='col-md-8'></div>
          </div>
        </div>
        <br/><br/><br/><br/>
      </div>
    )
  }
});

React.render(<AppComponent />, document.getElementById('app'));


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
import Wizard from './components/core/Wizard';
import Label from './components/core/Label';

var WizardItem1 = React.createClass({
  getValue: function() {
    return {
      name: this.refs.name.getValue(),
      pass: this.refs.pass.getValue()
    }
  },
  validate: function() {
    let _val = this.getValue();
    if(!_val.name || !_val.pass) {
      return {
        isValid: false,
        validationMsg: 'Please fill in your name and password to continue.'
      }
    }
    return {
      isValid: true,
      validationMsg: null
    }
  },
  render: function() {
    return (
      <div className='row'>
        <div className='col-md-7'>
          <h5 className='boldFont'>
            Provide your username and password
          </h5>
          <PaperInput placeholder='username' ref='name' value={ this.props.value.name || "" } /><br/>
          <PaperInput placeholder='password' type='password' ref='pass' value={ this.props.value.pass || "" } />
        </div>
        <div className='col-md-5'></div>
      </div>
    )
  }
});

var WizardItem3 = React.createClass({
  getValue: function() {
    return {
      desc: this.refs.desc.getValue()
    }
  },
  render: function() {
    return (
      <div className='row'>
        <div className='col-md-6'>
          <h5 className='boldFont'>Please describe yourself in short !!</h5>
          <PaperTextArea charLimit={150} placeholder='description' ref='desc' value={ this.props.value.desc || "" } />
        </div>
        <div className='col-md-6'></div>
      </div>
    )
  }
});

var WizardItem2 = React.createClass({
  getValue: function() {
    return {
      fname: this.refs.fname.getValue(),
      lname: this.refs.lname.getValue(),
      checked: this.refs.checked.getValue()
    }
  },
  render: function() {
    return (
      <div className='row'>
        <div className='col-md-6'>
          <h5 className='boldFont'>Fill in your personal details below.</h5>
          <PaperInput placeholder='firstname' ref='fname' value={ this.props.value.fname || "" } /><br/>
          <PaperInput placeholder='lastname' ref='lname' value={ this.props.value.lname || "" } /><br/>
          <Checkbox ref='checked' label='I agree to terms and conditions' checked={ this.props.value.checked || false } />
        </div>
        <div className='col-md-6'></div>
      </div>
    )
  }
});

var AppComponent = React.createClass({
  getInitialState: function() {
    return {
      tabVal: 59
    }
  },
  tabValChange: function(value) {
    this.setState({
      tabVal: value
    });
  },
  iconMenuValSelect: function(value) {
    alert('You selected '+value);
  },
  showModal: function() {

    let _actions = [{
      text: 'cancel'
    }, {
      text: 'submit',
      action: function() {}
    }], _header = 'Modal Header goes here',
    _content = "Hello, this is the modal content. Use dialogs sparingly because they are interruptive in nature. Their sudden appearance forces users to stop their current task and refocus on the dialog content. Not every choice, setting, or detail warrants interruption and prominence.";

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
    window.scrollTo(0, 0);
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
    ],
    _wizardItems = [
      <WizardItem1 />,
      <WizardItem2 />,
      <WizardItem3 />,
      <div>
        <h5>Hurray! All is done.</h5><br/>
        <PaperButton>submit</PaperButton><br/>
        <h6>P.S. The submit above does absolutely nothing.</h6>
      </div>
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
                  content: 'Mea quod explicari dissentiunt eu, cu mei laudem instructior. Cu eam saepe graeco labitur, nec et quot quodsi constituam, mea in ipsum sententiae. Iriure sanctus legendos et sed. Mel ut legere iracundia eloquentiam, pri diceret praesent ullamcorper et. Sea ne tincidunt definitionem. Ei vis diam iuvaret vulputate, id sit albucius reprimique, ne diam sint vivendo vel.'
                },
                {
                  header: 'Item Two',
                  content: 'Lorem ipsum dolor sit amet, elit appareat mea ei, id posse ubique dissentiunt usu. Vel augue mucius no, unum soleat lobortis sed in. Ad magna veniam malorum his, ne fastidii lobortis gloriatur usu, no cum dicat dicunt sadipscing. Cum legere dictas at, qui in habeo assum, sed in quot decore ridens. Quod blandit officiis ne cum, paulo luptatum per no. Ex duo quot conclusionemque, cum ad dicam doctus. Ut summo scripserit pro, cum putent nonumes facilisi ei.'
                },
                {
                  header: 'Item Three',
                  content: 'Esse elit utinam ut vel. Qui ne albucius recusabo, sale doming inermis vim ne. Nam scaevola rationibus ad. Est ei oratio antiopam dissentiet. Duo ex melius singulis interesset, at debet clita legere vim, everti expetendis interesset ex qui. Eu mel possit saperet omittantur, vis eu quod fugit.\
                  Ut deseruisse inciderint pri, bonorum elaboraret vis ne. Ad virtute accusamus intellegam mel, qui eirmod volutpat percipitur no. Duo homero euripidis cu. Vis at ignota persius, admodum dolores argumentum ad sed, eum ne omnis eirmod oporteat. Ad aeterno salutandi pro, cu pri tale prompta deserunt.'
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
                  charLimit={500}
                  value='Designing and developing between platforms is a lot like traveling through different countries.' />
                <br/><br/>
                <PaperTextArea
                  placeholder='description'
                  disabled={ true }
                  value='Designing and developing between platforms is a lot like traveling through different countries.' />
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
                      <PaperButton>search</PaperButton>
                    </div>
                    <div className='col-md-2'>
                      <PaperButton type='green'>create</PaperButton>
                    </div>
                    <div className='col-md-2'>
                      <PaperButton type='amber'>wifi off</PaperButton>
                    </div>
                    <div className='col-md-2'>
                      <PaperButton type='danger'>delete</PaperButton>
                    </div>
                    <div className='col-md-4'>
                      <PaperButton disabled={ true }>cancel</PaperButton>
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
                    <div className='col-md-2'>
                      <PaperButton type='danger' icon='delete'>delete</PaperButton>
                    </div>
                    <div className='col-md-4'>
                      <PaperButton disabled={ true } icon='cancel'>cancel</PaperButton>
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
                        <div className='col-md-2'>
                          <FabButton tooltip="delete" placement="bottom" type='danger'>
                            <i className="material-icons">clear</i>
                          </FabButton>
                        </div>
                        <div className='col-md-4'>
                          <FabButton disabled={ true } type='danger'>
                            <i className="material-icons">videocam_off</i>
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
                  title='Paris!'
                  content='Paris, France capital, is a major European city and a global center for art, fashion, gastronomy
                   and culture. Its picturesque 19th-century cityscape is crisscrossed by wide boulevards and the River
                    Seine.'
                />
              </div>
              <div className='col-md-6'>
                <h5>Solid-header card</h5>
                <Card
                  type='solid-header'
                  title='Paris!'
                  content='Paris, France capital, is a major European city and a global center for art, fashion, gastronomy
                   and culture. Its picturesque 19th-century cityscape is crisscrossed by wide boulevards and the River
                    Seine.'
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
                <IconMenu
                  openDirection='top-left'
                  items={['apple', 'orange', 'pineapple']}
                  onItemSelect={ this.iconMenuValSelect }
                />
              </div>
              <div className='col-md-3'>
                <h5>Top-Right</h5>
                <IconMenu
                  openDirection='top-right'
                  items={['apple', 'orange', 'pineapple']}
                  onItemSelect={ this.iconMenuValSelect }
                />
              </div>
              <div className='col-md-3'>
                <h5>Bottom-Left</h5>
                <IconMenu
                  openDirection='bottom-left'
                  items={['apple', 'orange', 'pineapple']}
                  onItemSelect={ this.iconMenuValSelect }
                />
              </div>
              <div className='col-md-3'>
                <h5>Bottom-Right</h5>
                <IconMenu
                  openDirection='bottom-right'
                  items={['apple', 'orange', 'pineapple']}
                  onItemSelect={ this.iconMenuValSelect }
                />
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
                ['Dessert (100g)', 'Calories', 'Fat (g)', 'Carbs (g)', 'Protein (g)', 'Sodium (mg)'],
                ['Frozen Yogurt', 159, 6, 24, 4.0, 89],
                ['Ice Cream Sandwich', 237, 9.0, 37, 4.3, 129],
                ['Eclair', 262, 16.0, 24, 6.0, 337],
                ['Cupcake', 305, 3.7, 67, 4.3, 413],
                ['Gingerbread', 356, 16.0, 49, 3.9, 327],
                ['Jelly bean', 375, 0.0, 94, 0.0, 50],
                ['Lollipop', 392, 0.2, 98, 0, 38],
                ['Honeycomb', 408, 3.2, 87, 6.5, 562]
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a lectus sit amet arcu accumsan varius. Nam congue eget ligula vel fermentum. Ut efficitur dui et magna varius, ac tincidunt lectus varius. Morbi pulvinar pulvinar sollicitudin. Nullam ornare volutpat arcu, et hendrerit lorem porta vitae. Proin convallis lobortis velit, dictum scelerisque leo elementum nec. Maecenas non augue ut dolor gravida mattis. Nunc vitae dolor a purus sagittis lacinia.
                  <br/><br/>
                  <div className='row'>
                    <div className='col-md-4'>
                      <h5>Total aggregate</h5>
                      <div className='row'>
                        <div className='col-md-10'>
                          <Slider min={0} max={100} value={59} onValueChange={ this.tabValChange } />
                        </div>
                        <div className='col-md-2 boldFont' style={{marginTop:'-0.5rem', color: '#2779fc'}}>
                          { this.state.tabVal || 59 }
                        </div>
                      </div>
                    </div>
                    <div className='col-md-8'></div>
                  </div>
                  <br/><br/>
                </div>
              </div>
              <div>
                <div>Tab Two</div>
                <div>
                  Curabitur rhoncus tortor in dui sollicitudin laoreet. Suspendisse malesuada consequat risus nec lacinia. Mauris commodo tellus vitae varius sagittis. Maecenas sit amet nibh felis.
                  <br/><br/>
                  <PaperTextArea placeholder='enter description' />
                </div>
              </div>
              <div>
                <div>Tab Three</div>
                <div>
                  Nunc ac ullamcorper augue, ornare sollicitudin mi. In a sodales neque, sed egestas ex. Pellentesque eget scelerisque elit. Vestibulum pulvinar nulla a dui faucibus, vestibulum pellentesque libero porta.
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
            <h3>Multi-Step Wizard</h3>
            <br/>
            <Wizard stepsCount={4} items={ _wizardItems } />
          </div>
          <br/><br/>
          <div className='eachComponent'>
            <h3>Labels</h3>
            <div className='row'>
              <div className='col-md-6'>
                <h5>default label</h5>
                <Label type='default'>
                  Lorem ipsum dolor sit amet, ne nam oportere liberavisse. Et pro fuisset electram suavitate. Sed et iisque lobortis intellegam.
                </Label>
              </div>
              <div className='col-md-6'>
                <h5>success label</h5>
                <Label type='success'>
                  Lorem ipsum dolor sit amet, ne nam oportere liberavisse. Et pro fuisset electram suavitate. Sed et iisque lobortis intellegam.
                </Label>
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-6'>
                <h5>info label</h5>
                <Label type='info'>
                  Lorem ipsum dolor sit amet, ne nam oportere liberavisse. Et pro fuisset electram suavitate. Sed et iisque lobortis intellegam.
                </Label>
              </div>
              <div className='col-md-6'>
                <h5>warning label</h5>
                <Label type='warning'>
                  Lorem ipsum dolor sit amet, ne nam oportere liberavisse. Et pro fuisset electram suavitate. Sed et iisque lobortis intellegam.
                </Label>
              </div>
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-md-6'>
              <h5>error label</h5>
              <Label type='error'>
                Lorem ipsum dolor sit amet, ne nam oportere liberavisse. Et pro fuisset electram suavitate. Sed et iisque lobortis intellegam.
              </Label>
            </div>
            <div className='col-md-6'></div>
          </div>
        </div>

        <br/><br/>

        <br/><br/>
        <div className="row" style={{
          position: 'absolute',
          bottom: 0,
          left: '15px',
          width: '100%'
        }}>
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
      </div>
    )
  }
});

React.render(<AppComponent />, document.getElementById('app'));

import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Share
} from 'react-native';
import {
  ActionSheetProvider,
  connectActionSheet,
  ActionSheetProps,
} from '@expo/react-native-action-sheet';
import ShowActionSheetButton from './ShowActionSheetButton';

type Props = ActionSheetProps;

interface State {
  selectedIndex: number | null;
  isModalOpen: boolean;
}

class App extends React.Component<Props, State> {
  state: State = {
    selectedIndex: null,
    isModalOpen: false,
  };


  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  _renderButtons() {
    const { showActionSheetWithOptions } = this.props;
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <ShowActionSheetButton
          title="Icons"
          withIcons
          onSelection={this.onShare}
          showActionSheetWithOptions={showActionSheetWithOptions}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.flex} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.headerText}>
            {
              'Hello!\n\nThis is a simple example app to demonstrate @expo/react-native-action-sheet. problems with Share '
            }
          </Text>
          {this._renderButtons()}
          <Text style={styles.notes}>
            You can clearly see that when we click on icons tab and then click on Share options then an extra share screen opened 
            which is unusual behaviour and thats the error I am talking about 
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const ConnectedApp = connectActionSheet<{}>(App);

export default class AppContainer extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <ConnectedApp />
      </ActionSheetProvider>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingVertical: 20,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  notes: {
    marginTop: 32,
  },
  sectionHeaderText: {
    color: 'orange',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  selectionText: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 16,
    marginTop: 20,
  },
  link: {
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

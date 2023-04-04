import { StyleSheet, Text, Switch, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Toggle from '../Toggle'
const Settings = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    // navigation.navigate('MyWidget')
    console.log('Mode is on')
    if (isEnabled == false) {
      console.log('Mode is off')

    }
  };

  return (
    <ScrollView>
      <View style={styles.Container}>
        <TouchableOpacity style={styles.Btn}>
          <Icon
            name="wallet-outline"
            style={[styles.icon]}
          >
          </Icon>
          <View>
            <Text style={styles.MonthlyBudgetText}>Monthly Budget</Text>
            <Text style={styles.OffText}>OFF</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.Btn}>
            <Icon
              name="cloud-off-outline"
              style={[styles.icon]}
            >
            </Icon>

            <Text style={styles.MonthlyBudgetText}>Private Mode</Text>

          </TouchableOpacity>
          <View style={styles.Toogle}>
            <Toggle navigation={navigation} />
          </View>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.Btn}>
            <Icon
              name="fingerprint"
              style={[styles.icon]}
            >
            </Icon>

            <Text style={styles.MonthlyBudgetText}>App Lock</Text>

          </TouchableOpacity>
          <View style={styles.Toogle1}>
            <Toggle navigation={navigation} />
          </View>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.Btn}>
            <Icon
              name="weather-night"
              style={[styles.icon]}
            >
            </Icon>

            <Text style={styles.MonthlyBudgetText}>Dark Theme</Text>

          </TouchableOpacity>
          <View style={styles.Toogle2}>
            <Toggle navigation={navigation} />
          </View>
        </View>
        <TouchableOpacity style={styles.Btn}>
          <Icon
            name="widgets-outline"
            style={[styles.icon]}
          >
          </Icon>
          <View>
            <Text style={styles.MonthlyBudgetText}>Widget</Text>
            <Text style={styles.OffText}>Stay up-to-date on epenses and due bills from your phone home screen</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Btn}>
          <Icon
            name="rotate-3d-variant"
            style={[styles.icon]}
          >
          </Icon>
          <View>
            <Text style={styles.MonthlyBudgetText}>Sync with Family</Text>
            <Text style={styles.OffText}>Consolidate data across multiple devices</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Btn}>
          <Icon
            name="email-check-outline"
            style={[styles.icon]}
          >
          </Icon>
          <View>
            <Text style={styles.MonthlyBudgetText}>Notification Access</Text>
            <Text style={styles.OffText}>Allow FinArt to record transactions based on notifications from other apps</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Btn}>
          <Icon
            name="circle-expand"
            style={[styles.icon]}
          >
          </Icon>
          <View>
            <Text style={styles.MonthlyBudgetText}>Selected Currency</Text>
            <Text style={styles.OffText}>Pakistan(PKR)</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Btn}>
          <Icon
            name="calendar-month-outline"
            style={[styles.icon]}
          >
          </Icon>
          <View>
            <Text style={styles.MonthlyBudgetText}>Month Start Day</Text>
            <Text style={styles.OffText}>1</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.Btn}>
            <Icon
              name="cloud-off-outline"
              style={[styles.icon]}
            >
            </Icon>

            <Text style={styles.MonthlyBudgetText}>Fade-out non expense/income </Text>

          </TouchableOpacity>
          <View style={styles.Toogle3}>
            <Toggle navigation={navigation} />
          </View>
        </View>
        <TouchableOpacity style={styles.Btn}>
          <Icon
            name="arrow-expand-up"
            style={[styles.icon]}
          >
          </Icon>
          <View>
            <Text style={styles.MonthlyBudgetText}>Backup</Text>
            <Text style={styles.OffText}>Backup your data to recover history in case of phone change/loss </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Btn}>
          <Icon
            name="arrow-collapse-down"
            style={[styles.icon]}
          >
          </Icon>
          <View>
            <Text style={styles.MonthlyBudgetText}>Restore</Text>
            <Text style={styles.OffText}>Restore data from backup file</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Btn}>
          <Icon
            name="card-text-outline"
            style={[styles.icon]}
          >
          </Icon>
          <View>
            <Text style={styles.MonthlyBudgetText}>Custom Import</Text>
            <Text style={styles.OffText}>Import data from a file created by others apps or from your local sheet</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.Btn}>
            <Icon
              name="plus"
              style={[styles.icon]}
            >
            </Icon>

            <Text style={styles.MonthlyBudgetText}>Cash Expense Reminder</Text>

          </TouchableOpacity>
          <View style={styles.Toogle5}>
            <Toggle navigation={navigation} />
          </View>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.Btn}>
            <Icon
              name="bell-ring-outline"
              style={[styles.icon]}
            >
            </Icon>

            <Text style={styles.MonthlyBudgetText}>Instant Notifications</Text>

          </TouchableOpacity>
          <View style={styles.Toogle4}>
            <Toggle navigation={navigation} />
          </View>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.Btn}>
            <Icon
              name="email"
              style={[styles.icon]}
            >
            </Icon>

            <Text style={styles.MonthlyBudgetText}>Trash sach-in-hand as expen..</Text>

          </TouchableOpacity>
          <View style={styles.Togle2}>
            <Toggle navigation={navigation} />
          </View>
        </View>
        <TouchableOpacity style={styles.Btn1}>
          <Icon
            name="delete-outline"
            style={[styles.icon]}
          >
          </Icon>
          <View>
            <Text style={styles.MonthlyBudgetText}>Reset app data</Text>
            <Text style={styles.OffText}>Delete app data and set it up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Settings

const styles = StyleSheet.create({
  icon: {
    flex: 0,
    color: 'black',
    fontSize: 25,
    marginVertical: 10,
    marginLeft: 20

  },
  Container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  Btn: {
    flexDirection: 'row',
    marginTop: 20
  },
  Btn1: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20
  },
  MonthlyBudgetText: {
    fontSize: 14,
    color: '#000',
    marginHorizontal: 40,
    marginTop: 6,
    fontWeight: '500'
  },
  OffText: {
    fontSize: 14,
    marginHorizontal: 40,
    fontWeight: '500',
    marginRight: 60
  },
  btn: {
    flexDirection: 'row',

  },
  Toogle: {
    marginLeft: 90,
    marginTop: 20,
  },
  Toogle4: {
    marginLeft: 60,
    marginTop: 20,
  },
  Toogle5: {
    marginLeft: 40,
    marginTop: 20,
  },
  Toogle1: {
    marginLeft: 118,
    marginTop: 20,
  },
  Toogle2: {
    marginLeft: 100,
    marginTop: 20,
  },
  Togle2: {
    marginLeft: -3,
    marginTop: 20,
  },
  Toogle3: {
    // marginLeft: 100,
    marginTop: 20,
  }
})







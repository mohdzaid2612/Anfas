import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Dimensions } from 'react-native'
import BackButton from '../../components/BackButton'
import { useNavigation } from 'react-navigation-hooks'
import {
    getMainBackgroundColor,
    getHeaderTitleColor,
    getBackgroundColor,
    getButtonBackGround
} from '../../utils/colorHelper'

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DoctorsList from './DoctorsList'
const doctors = [
    {
        id: 1,
        name: 'Dr. Mahmud Nik Hasan',
        speciality: 'Cardiologist',
        number: '966-96583 23404',
        status: 'Available'
    },
    {
        id: 2,
        name: 'Dr. Mahmud Nik Hasan',
        speciality: 'Cardiologist',
        number: '966-96583 23404',
        status: 'Available'
    },
    {
        id: 3,
        name: 'Dr. Mahmud Nik Hasan',
        speciality: 'Cardiologist',
        number: '966-96583 23404',
        status: 'Not Available'
    },
    {
        id: 4,
        name: 'Dr. Mahmud Nik Hasan',
        speciality: 'Cardiologist',
        number: '966-96583 23404',
        status: 'Available'
    },
    {
        id: 5,
        name: 'Dr. Mahmud Nik Hasan',
        speciality: 'Cardiologist',
        number: '966-96583 23404',
        status: 'Not Available'
    },
    {
        id: 6,
        name: 'Dr. Mahmud Nik Hasan',
        speciality: 'Cardiologist',
        number: '966-96583 23404',
        status: 'Available'
    },
    {
        id: 7,
        name: 'Dr. Mahmud Nik Hasan',
        speciality: 'Cardiologist',
        number: '966-96583 23404',
        status: 'Available'
    },
]


const SelectCategory = () => {
    const layout = useWindowDimensions();
    const naviagtion = useNavigation();

    const [type, setType] = useState('');
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Available Doctos' },
        { key: 'second', title: 'Previously Consulted' },
    ]);

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <DoctorsList doctors={doctors} />
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
            <DoctorsList doctors={doctors} />
        </View>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    useEffect(() => {
        setType(naviagtion.getParam('type'))
    }, [])
    // console.log(route.params)

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: getButtonBackGround(), height: 4,
                borderRadius: 4
            }}

            style={{ backgroundColor: '#fff' }}
            labelStyle={{ color: '#000' }}
            renderLabel={({ route, focused }) => (
                <Text
                    adjustsFontSizeToFit
                    style={{
                        color: focused ? getButtonBackGround() : '#aaaaaa',
                        margin: 0,
                        textTransform: 'capitalize',
                        fontSize: 16,

                    }}>
                    {route.title}
                </Text>
            )}
        />
    );
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.headerContainer}>
                <View style={styles.innerHeaderContainer}>
                    <TouchableOpacity style={styles.backBtn}>
                        <BackButton onBackPress={() => naviagtion.goBack()} containerStyle={styles.backButtonContainer} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.type}>{type}</Text>
                    </View>
                </View>
            </View>
            <TabView

                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    )
}

export default SelectCategory

const styles = StyleSheet.create({

    headerContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60
    },
    innerHeaderContainer: {
        width: '93%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    backBtn: {
        marginRight: '5%'
    },
    type: {
        fontSize: 19,
        fontWeight: '800'
    }

})

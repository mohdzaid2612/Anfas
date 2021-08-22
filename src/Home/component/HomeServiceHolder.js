import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import {widthScale, heightScale, ratioWidth} from '../../utils/dimensionHelper';

import HomeServiceItem from './HomeServiceItem';

const HomeServiceHolder = props => {
  const {data, onExploreClicked} = props;

  const renderHomeServiceItem = ({item, index}) => {
    const {name} = item;
    return (
      <HomeServiceItem
        containerStyle={{
          width: ratioWidth(85),
          marginLeft: index === 0 ? widthScale(16) : 0,
        }}
        title={name}
        onExploreClicked={() => onExploreClicked(item)}
      />
    );
  };

  const renderHomeService = () => {
    if (data.length === 1) {
      const {name} = data[0];
      return (
        <HomeServiceItem
          containerStyle={{
            marginHorizontal: widthScale(16),
          }}
          title={name}
          onExploreClicked={() => onExploreClicked(data[0])}
        />
      );
    } else {
      return (
        <FlatList
          data={data}
          renderItem={renderHomeServiceItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingTitle}>Explore home services</Text>
      {renderHomeService()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: heightScale(40),
    flex: 1,
  },
  headingTitle: {
    // fontFamily: "HKGrotesk-Regular",
    fontSize: 18,
    lineHeight: 23,
    color: '#000',
    marginHorizontal: widthScale(16),
    marginBottom: heightScale(16),
    fontWeight: '800',
  },
});

HomeServiceHolder.defaultProps = {
  data: [1, 2, 3],
};

export default HomeServiceHolder;
